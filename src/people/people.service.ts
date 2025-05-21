import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectModel } from '@nestjs/mongoose'
import { People } from './interface/people.interface'
import { Model } from 'mongoose'
import { Logger } from '@nestjs/common';

export interface PeopleFilter {
  firstname?: string,
  lastname?: string,
  age?: Number,
  email?: string,
  isCool?: Boolean,
}

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel('People') private readonly peopleModel: Model<People>,) { }

  create(createPersonDto: CreatePersonDto): Promise<People> {
    const newPerson = new this.peopleModel(createPersonDto);
    return newPerson.save();
  }

  findAll(filter: PeopleFilter = {}): Promise<People[]> {
    const query: any = {};
    if (filter.firstname != undefined) { query.firstname = filter.firstname; }
    if (filter.lastname != undefined) { query.lastname = filter.lastname; }
    if (filter.age != undefined) { query.age = filter.age; }
    if (filter.email != undefined) { query.email = filter.email; }
    if (filter.isCool != undefined) { query.isCool = filter.isCool; }

    return this.peopleModel.find(query).exec();
  }

  async findOneByName(name: string): Promise<People> {
    const found = await this.peopleModel
      .findOne({
        $or: [
          { firstname: name },
          { lastname: name },
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
      ],
    }).exec();
    if (!found) {
      throw new NotFoundException("Person not found ");
    }
    const email = found.email;
    return { email: email };
  }

  async findAgeFromName(name : string): Promise<{age : number}>{
    const found = await this.peopleModel.findOne({
      $or: [
        {firstname: name},
        {lastname: name},
      ],
    }).exec();
    if(!found){
      throw new NotFoundException('Person not found');
    }
    const age = found.age;
    return {age : age};
  }

  async findLastFromFirst(firstname: string): Promise<{ lastname : string }>{
    const found = await this.peopleModel.findOne({firstname}).exec();
    if(!found){
      throw new NotFoundException("Perrson not found");
    }
    const lastname = found.lastname;
    return {lastname : lastname};
  }

  async findFirstFromLast(lastname: string): Promise<{ firstname : string }>{
    const found = await this.peopleModel.findOne({lastname}).exec();
    if(!found){
      throw new NotFoundException("Perrson not found");
    }
    const firstname = found.firstname;
    return {firstname : firstname};
  }

  async findCoolPeople(isCool: boolean, filter: PeopleFilter = {}): Promise<People[]>{
    filter.isCool = isCool;
    const found = this.peopleModel.find(filter);
    if(!found){
      throw new NotFoundException('No Matches Found');
    }
    return found;
  }

  async updateFirstName(filter: PeopleFilter, newFirstName: string, updatePersonDto: UpdatePersonDto) {
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
