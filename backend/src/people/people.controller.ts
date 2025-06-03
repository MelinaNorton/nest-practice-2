import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Res, Req, UseInterceptors, BadRequestException, UploadedFile } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { QueryPeopleDto } from './dto/query-people.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PeopleService } from './people.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { MulterModule } from '@nestjs/platform-express';
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.peopleService.create(createPersonDto);
  }

  //upload image files for added image field in the schema
  @Patch(':username')
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (_req, file, cb) => {
          const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split(".").pop();
          cb(null,`${_req.params.username}-${suffix}.${extension}`)
        },
      }),
      fileFilter: (_req, file, cb) => {
        if(!file.mimetype.startsWith("image/")){
          return cb(new BadRequestException("Wrong File Type"), false);
        }
        cb(null, true);
      }
    })
  )
  upload(@Param('username') usernameParam: string, @UploadedFile() file: Express.Multer.File, @Body() updatePersonDto:UpdatePersonDto) {
    const filter = { username: usernameParam };
    const imgFile = `/uploads/${file.filename}`;
    return this.peopleService.upload(filter, updatePersonDto, imgFile);
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: QueryPeopleDto) {
    return this.peopleService.findAll(query);
  }

  //@UseGuards(JwtAuthGuard)
  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.peopleService.findOneByName(name);
  }

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
