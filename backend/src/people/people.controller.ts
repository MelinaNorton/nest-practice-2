import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Res, Req } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { QueryPeopleDto } from './dto/query-people.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PeopleService } from './people.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';


@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.peopleService.create(createPersonDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: QueryPeopleDto) {
    return this.peopleService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.peopleService.findOneByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':name/email')
  findOneEmail(@Param('name') name: string) {
    return this.peopleService.findEmailAnyName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':firstname/lastname')
  getLastfromFirst(@Param('firstname') firstname: string) {
    return this.peopleService.findLastFromFirst(firstname);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':lastname/firstname')
  getFirstFromLast(@Param('lastname') lastname: string) {
    return this.peopleService.findFirstFromLast(lastname);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':name/age')
  getAgeFromName(@Param('name') name: string) {
    return this.peopleService.findAgeFromName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':firstname')
  update(@Param('firstname') firstnameparam: string, @Body('newFirstName') newFirstName: string, @Body() updatePersonDto: UpdatePersonDto, @Res({ passthrough: true }) res: Response, @Req() req: Request) {
    const filter = { firstname: firstnameparam };
    return this.peopleService.updateFirstName(filter, newFirstName, updatePersonDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.peopleService.removeByAnyName(name);
  }
}
