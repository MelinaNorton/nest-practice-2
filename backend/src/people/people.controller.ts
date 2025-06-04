import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Res, Req, UseInterceptors, BadRequestException, UploadedFile } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { QueryPeopleDto } from './dto/query-people.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PeopleService } from './people.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { join } from 'path';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.peopleService.create(createPersonDto);
  }

  //upload image files for added image field in the schema
  //note: anywhere you see Multer's "cb" function, this just refers to a callback- the parameters can very, but basically:
  //  null=no error, new Error()=error, "foo"=filename or filepath, t/f=accept or deny file
  @Patch(':username')
  @UseInterceptors(
    //defines the kind of media being sent in
    FileInterceptor("file", {
      //defines the kind/location the file should be stored in
      storage: diskStorage({
        destination: (req, file, cb) => {
        const uploadPath = join(process.cwd(), 'uploads');
        cb(null, uploadPath);
      },
        //dynamicallu creates the filename upon upload (file extension simply popped, but unique suffix for multiple uploads a day generated from the current day + random number)
        filename: (_req, file, cb) => {
          const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split(".").pop();
          //puts filename parts together
          cb(null,`${_req.params.username}-${suffix}.${extension}`)
        },
      }),
      //aplies a filter to attempted uploads to intercept any non-image files
      fileFilter: (_req, file, cb) => {
        //file.mimetype is a function that returns the findtype; here, its checking if that returned data starts with the image-extension, "/image"
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

  //get image files
  @Get(":username/image")
  getImage(@Param("username") username:string){
    const filter = {username : username};
    return this.peopleService.getImage(filter);
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
