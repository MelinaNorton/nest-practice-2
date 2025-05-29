import { Injectable, NotFoundException, ParseBoolPipe } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectModel } from '@nestjs/mongoose'
import { People } from './interface/people.interface'
import { Model } from 'mongoose'
import { Logger } from '@nestjs/common';
import { QueryPeopleDto } from './dto/query-people.dto';
import { hash } from 'bcrypt';
import * as bcrypt from 'bcryptjs'
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export interface PeopleFilter {
  firstname?: string,
  lastname?: string,
  age?: number,
  email?: string,
  isCool?: boolean,
  username?: string
}

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel('People') private readonly peopleModel: Model<People>, private jwtService: JwtService, private configService: ConfigService) { }

  async create(createPersonDto: CreatePersonDto): Promise<People> {
    require('bcrypt');
    const salt = await bcrypt.genSalt(10);
    const securepasswprd = await bcrypt.hash(createPersonDto.password, salt);
    const securePerson = new this.peopleModel({
      ...createPersonDto,
      password: securepasswprd,
    })
    const newPerson = new this.peopleModel(createPersonDto);
    await newPerson.save();

    return newPerson;
  }

  findAll(mergefilter: QueryPeopleDto): Promise<People[]> {
    const definedfilter: QueryPeopleDto = {};
    if (mergefilter.firstname != undefined) { definedfilter.firstname = mergefilter.firstname; }
    if (mergefilter.lastname != undefined) { definedfilter.lastname = mergefilter.lastname; }
    if (mergefilter.isCool != undefined) { definedfilter.isCool = mergefilter.isCool }
    if (mergefilter.age != undefined) { definedfilter.age = mergefilter.age }
    return this.peopleModel.find(definedfilter).exec();
  }

  async findOneByName(name: string): Promise<People> {
    const found = await this.peopleModel
      .findOne({
        $or: [
          { firstname: name },
          { lastname: name },
          { username: name }
        ],
      })
      .exec();
    if (!found) {
      throw new NotFoundException("Person not found");
    }
    return found;
  }

  async findEmailAnyName(name: string): Promise<{ email: string }> {
    const found = await this.peopleModel.findOne({
      $or: [
        { firstname: name },
        { lastname: name },
        { username : name },
      ],
    }).exec();
    if (!found) {
      throw new NotFoundException("Person not found ");
    }
    const email = found.email;
    return { email: email };
  }

  async findAgeFromName(name: string): Promise<{ age: number }> {
    const found = await this.peopleModel.findOne({
      $or: [
        { firstname: name },
        { lastname: name },
      ],
    }).exec();
    if (!found) {
      throw new NotFoundException('Person not found');
    }
    const age = found.age;
    return { age: age };
  }

  async findLastFromFirst(firstname: string): Promise<{ lastname: string }> {
    const found = await this.peopleModel.findOne({ firstname }).exec();
    if (!found) {
      throw new NotFoundException("Perrson not found");
    }
    const lastname = found.lastname;
    return { lastname: lastname };
  }

  async findFirstFromLast(lastname: string): Promise<{ firstname: string }> {
    const found = await this.peopleModel.findOne({ lastname }).exec();
    if (!found) {
      throw new NotFoundException("Perrson not found");
    }
    const firstname = found.firstname;
    return { firstname: firstname };
  }

  async findCoolPeople(isCool: boolean, filter: PeopleFilter = {}): Promise<People[]> {
    filter.isCool = isCool;
    const found = await this.peopleModel.find(filter);
    if (!found) {
      throw new NotFoundException('No Matches Found');
    }
    return found;
  }

  async findAllAges(age: number, filter: PeopleFilter = {}): Promise<People[]> {
    filter.age = age;
    const found = await this.peopleModel.find(filter);
    if (!found) {
      throw new NotFoundException('No Matches Found');
    }
    return found;
  }
  async updateFirstName(filter: PeopleFilter, newFirstName: string, updatePersonDto: UpdatePersonDto,) {
    const updated = {
      ...updatePersonDto,
      firstname: newFirstName
    }
    const changed = await this.peopleModel.findOneAndUpdate(filter, updated, { new: true });
    if (!changed) {
      throw new NotFoundException("No Person Foud by that name!");
    }
    return changed;
  }

  async updatePass(filter: PeopleFilter, newPass: string, updatePersonDto: UpdatePersonDto) {
    const salt = await bcrypt.genSalt(10);
    const securepassword = await bcrypt.hash(newPass, salt);
    const updated = {
      ...updatePersonDto,
      password: securepassword
    }
    const changed = await this.peopleModel.findOneAndUpdate(filter, updated, { new: true });
    if (!changed) {
      throw new NotFoundException("No Person Foud by that name!");
    }
    return changed;
  }
  async removeByAnyName(name: string): Promise<People> {
    const found = await this.peopleModel.findOneAndDelete({
      $or: [
        { firstname: name },
        { lastname: name },
      ],
    });
    if (!found) {
      throw new NotFoundException("Person not found");
    }
    return found;
  }
}
