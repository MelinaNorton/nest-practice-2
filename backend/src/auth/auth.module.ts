import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PeopleModule } from './../people/people.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt.auth.guard';

require("dotenv").config();
//this module includes the controller and services for authentication, but
//also very importantly...
//1(includes and sets our PassportModule with our auth method jwt tokens)
//2(includes and sets our JwtModule with our imported Config resources)
//3(sets our user=defined fields within \ConfigService using our .env file)
@Module({
  imports: [
    ConfigModule,
    PeopleModule,
    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `./app.env`
      }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule, PeopleModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        }
      }
    }),
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService, JwtStrategy, JwtAuthGuard
  ],
  exports: [PassportModule, JwtModule]
})
export class AuthModule { }
