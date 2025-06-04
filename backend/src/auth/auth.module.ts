import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule} from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PeopleModule } from './../people/people.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt.auth.guard';
require("dotenv").config();

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
