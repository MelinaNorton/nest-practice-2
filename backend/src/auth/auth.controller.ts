import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/login-user.dto';
import { SignUpDto } from './dto/signup.dto';
import { Body, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Res } from '@nestjs/common';
import { UpdatePersonDto } from 'src/people/dto/update-person.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservice: AuthService) { }

    @Post('signup')
    signUp(@Body() signupDto: SignUpDto) {
        return this.authservice.signup(signupDto);
    }

    @Patch('login')
    async loginUser(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response,) {
        const token = await this.authservice.login(loginDto);
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60,
            path: '/',
        });
        return { success: true };
    }

    @Patch('reset/pass')
    resetPass(@Body() updatePersonDto: UpdatePersonDto) {
        return this.authservice.resetPass(updatePersonDto);
    }

    @Patch('forgot/pass')
    forgotPass(@Body() updatePersonDto: UpdatePersonDto) {
        return this.authservice.forgotPassReset(updatePersonDto);
    }
}
