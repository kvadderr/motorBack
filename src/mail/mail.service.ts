import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from './../user/user.entity';
import { UserResponse } from 'src/user/type/userResponse';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { FranchisorService } from 'src/franchisor/franchisor.service';

@Injectable()
export class MailService {
    constructor(
        private mailerService: MailerService,
        private franchaisorService: FranchisorService
    ) { }

    async sendLoginData(user: UserResponse, password: string) {
        await this.mailerService.sendMail({
            to: user.email,

            subject: 'Welcome to Nice App! Confirm your Email',
            template: './sendLoginData',
            context: {
                role: user.role,
                login: user.email,
                password: password,
                link: "http://194.58.90.70:5173"
                //url,
            },
        });
    }

    async sendFranchisorConfirmation(user: RegisterUserDto, token: string) {

        console.log('user in sedn mail', user)

        const url = `http://194.58.90.70:5173/signin`;

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
        console.log(user);
        const link = `http://194.58.90.70:5173/register?token=${token}`;
        const comapany = (await this.franchaisorService.findOne(user.franchisee.franchisor_id)).company;
        console.log(comapany)
        await this.mailerService.sendMail({
            to: user.email,

            subject: 'ВАШ ПАРОЛЬ  -  ',
            template: './inviteFranchisee',
            context: {
                company_name: comapany,
                link,
                //url,
            },
        });
    }


}
