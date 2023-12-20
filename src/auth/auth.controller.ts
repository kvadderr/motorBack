import {
    Controller,
    Post,
    Req,
    Body,
    BadRequestException,
    ForbiddenException,
    UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginResponse } from './type/loginResponse';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/loginUser.dto';
import { User, UserRole } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { CookieInterceptor } from './interceptor/cookie.interceptor';
import { MailService } from 'src/mail/mail.service';
import { Roles } from './decorator/roles.decorator';

@UseInterceptors(CookieInterceptor)
@Controller('/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly mailService: MailService,
    ) { }

    @Post('register')
    async registerUser(
        @Body() registerUserDto: RegisterUserDto,
    ): Promise<LoginResponse> {
        const { email, password, ...rest } = registerUserDto;
        console.log('registerUserDto', registerUserDto);
        const existingUser = await this.userService.findOneByEmail(email);

        if (existingUser) {
            throw new BadRequestException('User already exists.');
        }

        try {
            const saltRounds = 12;

            const hashedPassword = registerUserDto.role !== UserRole.FRANCHISOR && registerUserDto.role !== UserRole.FRANCHISEE ? await bcrypt.hash(password, saltRounds) : "";
            const user = await this.userService.create({
                ...registerUserDto,
                password: hashedPassword,
            });

            const { id, role, tokenVersion } = user;
            const tokens = this.authService.assignTokens(id, role, tokenVersion);

            if (user.role === UserRole.ADMIN || user.role === UserRole.MANAGER) await this.mailService.sendLoginData(user, password);
            if (user.role === UserRole.FRANCHISOR) await this.mailService.sendFranchisorConfirmation(registerUserDto, tokens.accessToken);
            if (user.role === UserRole.FRANCHISEE) await this.mailService.inviteFranchisee(registerUserDto, tokens.accessToken);

            return tokens;
        } catch (error) {
            console.log(error)
            throw new BadRequestException('Failed to register user.');
        }
    }

    @Post('login')
    async loginUser(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
        const { email, password: loginPassword } = loginUserDto;
        let existingUser: Omit<User, 'createdAt' | 'updatedAt'>;
        let isValid: boolean;

        try {
            existingUser = await this.userService.findUserWithPassword(email);
            isValid = await bcrypt.compare(loginPassword, existingUser.password);
            if (!isValid) { throw new ForbiddenException('Username or password is invalid') }
        } catch (error) {
            throw new ForbiddenException('Username or password is invalid');
        }

        const { id, role, tokenVersion } = existingUser;
        const { password, ...user } = existingUser;
        const tokens = this.authService.assignTokens(id, role, tokenVersion);
        return tokens;
    }

    @Post('sendCode')
    async sendCode(@Body() loginUserDto: LoginUserDto) {
        const { email } = loginUserDto;
        const saltRounds = 12;
        let existingUser: Omit<User, 'createdAt' | 'updatedAt'>;

        try {
            const password = await this.authService.generateRandomString(7);
            console.log('loginUserDto', loginUserDto)
            console.log('email', email)
            const hashedPassword = await bcrypt.hash(password, saltRounds)    
            existingUser = await this.userService.findUserWithPassword(email);
            console.log('existingUser', existingUser)
            await this.mailService.sendFranchisorNewPassword(existingUser, password);
            await this.userService.create({
                ...existingUser,
                password: hashedPassword,
            });
        } catch (error) {
            console.error('Error in sendCode:', error);
            throw new ForbiddenException('Username or password is invalid');
        }

        return;
    }

    @Post('refresh-token')
    async getTokens(@Req() req): Promise<LoginResponse> {
        const token = req.cookies['refreshToken'];
        try {
            const {
                accessToken,
                refreshToken,
                user,
            } = await this.authService.refreshTokens(token);
            if (accessToken && user) {
                return { accessToken, refreshToken };
            }
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }
}