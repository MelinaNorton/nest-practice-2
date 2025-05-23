import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/login-user.dto';
import { SignUpDto } from './dto/signup.dto';
import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UpdatePersonDto } from 'src/people/dto/update-person.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservice: AuthService){}

    @Post(':signup')
    signUp(@Body() signupDto: SignUpDto){
        return this.authservice.signup(signupDto);
    }

    @Patch(':login')
    loginUser(@Body() loginDto: LoginDto){
        console.log("login service activated");
        return this.authservice.login(loginDto);
    }

    @Patch(':reset/pass')
    resetPass(@Body() updatePersonDto: UpdatePersonDto){
        console.log("reset service activated");
        return this.authservice.resetPass(updatePersonDto);
    }

    @Patch(':forgot/pass')
    forgotPass(@Body() updatePersonDto : UpdatePersonDto){
        return this.authservice.forgotPassReset(updatePersonDto);
    }
}
