import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/login-user.dto';
import { SignUpDto } from './dto/signup.dto';
import { UpdatePersonDto } from 'src/people/dto/update-person.dto';
export declare class AuthController {
    private readonly authservice;
    constructor(authservice: AuthService);
    signUp(signupDto: SignUpDto): Promise<import("../people/interface/people.interface").People>;
    loginUser(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    resetPass(updatePersonDto: UpdatePersonDto): Promise<import("../people/interface/people.interface").People>;
    forgotPass(updatePersonDto: UpdatePersonDto): Promise<import("../people/interface/people.interface").People>;
}
