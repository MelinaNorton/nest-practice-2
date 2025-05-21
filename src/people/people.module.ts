import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { MongooseModule }  from '@nestjs/mongoose';
import { PeopleSchema } from './schema/people.schema'
@Module({
  imports: [MongooseModule.forFeature([{name:"People", schema: PeopleSchema}])],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}
