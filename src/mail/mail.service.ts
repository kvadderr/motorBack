import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from './../user/user.entity';
import { UserResponse } from 'src/user/type/userResponse';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendUserConfirmation(user: UserResponse) {
        await this.mailerService.sendMail({
            to: user.email,

            subject: 'Welcome to Nice App! Confirm your Email',
            template: './confirmation',
            context: {
                name: user.email,
                //url,
            },
        });
    }

    async sendAdminConfirmation(user: UserResponse, password: string) {
        await this.mailerService.sendMail({
            to: user.email,

            subject: 'Welcome to Nice App! Confirm your Email',
            template: './confirmation',
            context: {
                role: user.role,
                name: user.email,
                password: password
                //url,
            },
        });
    }
    
    async sendFranchisorConfirmation(user: RegisterUserDto, token: string) {
        
        const url =`http://localhost:5173/signin`;
        
        await this.mailerService.sendMail({
            to: user.email,

            subject: 'Добро пожаловать на платформу MotorLMS! ',
            template: './confirmationFranchisor',
            context: {
                name: user.franchisor.FIO,
                url
                //url,
            },
        });
    }

    async sendFranchisorNewPassword(user: RegisterUserDto, password: string) {
        console.log('send mess', user)
        await this.mailerService.sendMail({
            to: user.email,

            subject: 'ВАШ ПАРОЛЬ  -  ',
            template: './sendPassword',
            context: {
                name: user.email,
                password: password,
                //url,
            },
        });
    }


    async inviteFranchisee(user: RegisterUserDto, token: string) {

        const url =`http://localhost:5173/register?token=${token}`;
        

        await this.mailerService.sendMail({
            to: user.email,

            subject: 'ВАШ ПАРОЛЬ  -  ',
            template: './inviteFranchisee',
            context: {
                company_name: user.franchisee.franchisor_id,
                url,
                //url,
            },
        });
    }


}
