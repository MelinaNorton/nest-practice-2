import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/login-user.dto';
import { SignUpDto } from './dto/signup.dto';
import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservice: AuthService){}

    @Post(':signup')
    signUp(@Body() signupDto: SignUpDto){
        return this.authservice.signup(signupDto);
    }

    @Patch(':login')
    loginUser(@Body() loginDto: LoginDto){
        return this.authservice.login(loginDto);
    }
}
