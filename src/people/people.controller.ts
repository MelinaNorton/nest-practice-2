import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseBoolPipe} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PeopleFilter } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.peopleService.create(createPersonDto);
  }

  @Get()
  findAll(@Query('isCool', new ParseBoolPipe({ optional : true })) isCool?) {
    if(typeof isCool === 'boolean'){
      return this.peopleService.findCoolPeople(isCool);
    }
    return this.peopleService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.peopleService.findOneByName(name);
  }

  @Get(':name/email')
  findOneEmail(@Param('name') name: string) {
    return this.peopleService.findEmailAnyName(name);
  }

  @Get(':firstname/lastname')
  getLastfromFirst(@Param('firstname') firstname: string){
    return this.peopleService.findLastFromFirst(firstname);
  }

  @Get(':lastname/firstname')
  getFirstFromLast(@Param('lastname') lastname : string){
    return this.peopleService.findFirstFromLast(lastname);
  }

  @Get(':name/age')
  getAgeFromName(@Param('name') name : string){
    return this.peopleService.findAgeFromName(name);
  }

  @Patch(':firstname')
  update(@Param('firstname') firstnameparam: string, @Body('newFirstName') newFirstName: string, @Body() updatePersonDto: UpdatePersonDto) {
    const filter = { firstname: firstnameparam };
    return this.peopleService.updateFirstName(filter, newFirstName, updatePersonDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.peopleService.removeByAnyName(name);
  }
}
