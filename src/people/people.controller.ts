import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PeopleFilter } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.peopleService.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.peopleService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.peopleService.findOneByName(name);
  }

  @Get(':name/email')
  findOneEmail(@Param('name') name: String){
    return this.peopleService.findEmailAnyName(name);
  }

  @Patch(':firstname')
  update(@Param('firstname') firstnameparam:string, @Body('newFirstName') newFirstName: string, @Body() updatePersonDto: UpdatePersonDto) {
    const filter = { firstname : firstnameparam};
    return this.peopleService.updateFirstName(filter, newFirstName, updatePersonDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.peopleService.removeByAnyName(name);
  }
}
