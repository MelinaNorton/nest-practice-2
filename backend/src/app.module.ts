import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://linamelina0707:gfnmEAPfyM3BlMMJ@cluster0.gqer0il.mongodb.net/'),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PeopleModule,
    AuthModule,
    UsersModule
  ],
})
export class AppModule {}
