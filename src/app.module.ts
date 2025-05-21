import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { MongooseModule } from '@nestjs/mongoose'
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://linamelina0707:gfnmEAPfyM3BlMMJ@cluster0.gqer0il.mongodb.net/'),
    PeopleModule
  ],
})
export class AppModule {}
