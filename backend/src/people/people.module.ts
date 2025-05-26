import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { MongooseModule }  from '@nestjs/mongoose';
import { PeopleSchema } from './schema/people.schema'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([{name:"People", schema: PeopleSchema}])],
  controllers: [PeopleController],
  providers: [PeopleService, JwtService, ConfigService],
  exports: [PeopleService]
})
export class PeopleModule {}
