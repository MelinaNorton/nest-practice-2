"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let PeopleService = class PeopleService {
    peopleModel;
    jwtService;
    configService;
    constructor(peopleModel, jwtService, configService) {
        this.peopleModel = peopleModel;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async create(createPersonDto) {
        require('bcrypt');
        const salt = await bcrypt.genSalt(10);
        const securepasswprd = await bcrypt.hash(createPersonDto.password, salt);
        const securePerson = new this.peopleModel({
            ...createPersonDto,
            password: securepasswprd,
        });
        const newPerson = new this.peopleModel(createPersonDto);
        await newPerson.save();
        return newPerson;
    }
    findAll(mergefilter) {
        const definedfilter = {};
        console.log('mergefilter', mergefilter);
        if (mergefilter.firstname != undefined) {
            definedfilter.firstname = mergefilter.firstname;
        }
        if (mergefilter.lastname != undefined) {
            definedfilter.lastname = mergefilter.lastname;
        }
        if (mergefilter.isCool != undefined) {
            definedfilter.isCool = mergefilter.isCool;
        }
        if (mergefilter.age != undefined) {
            definedfilter.age = mergefilter.age;
        }
        console.log('definedfilter', definedfilter);
        return this.peopleModel.find(definedfilter).exec();
    }
    async findOneByName(name) {
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
            throw new common_1.NotFoundException("Person not found");
        }
        return found;
    }
    async findEmailAnyName(name) {
        const found = await this.peopleModel.findOne({
            $or: [
                { firstname: name },
                { lastname: name },
            ],
        }).exec();
        if (!found) {
            throw new common_1.NotFoundException("Person not found ");
        }
        const email = found.email;
        return { email: email };
    }
    async findAgeFromName(name) {
        const found = await this.peopleModel.findOne({
            $or: [
                { firstname: name },
                { lastname: name },
            ],
        }).exec();
        if (!found) {
            throw new common_1.NotFoundException('Person not found');
        }
        const age = found.age;
        return { age: age };
    }
    async findLastFromFirst(firstname) {
        const found = await this.peopleModel.findOne({ firstname }).exec();
        if (!found) {
            throw new common_1.NotFoundException("Perrson not found");
        }
        const lastname = found.lastname;
        return { lastname: lastname };
    }
    async findFirstFromLast(lastname) {
        const found = await this.peopleModel.findOne({ lastname }).exec();
        if (!found) {
            throw new common_1.NotFoundException("Perrson not found");
        }
        const firstname = found.firstname;
        return { firstname: firstname };
    }
    async findCoolPeople(isCool, filter = {}) {
        filter.isCool = isCool;
        const found = await this.peopleModel.find(filter);
        if (!found) {
            throw new common_1.NotFoundException('No Matches Found');
        }
        return found;
    }
    async findAllAges(age, filter = {}) {
        filter.age = age;
        const found = await this.peopleModel.find(filter);
        if (!found) {
            throw new common_1.NotFoundException('No Matches Found');
        }
        return found;
    }
    async updateFirstName(filter, newFirstName, updatePersonDto) {
        const updated = {
            ...updatePersonDto,
            firstname: newFirstName
        };
        const changed = await this.peopleModel.findOneAndUpdate(filter, updated, { new: true });
        if (!changed) {
            throw new common_1.NotFoundException("No Person Foud by that name!");
        }
        return changed;
    }
    async updatePass(filter, newPass, updatePersonDto) {
        const salt = await bcrypt.genSalt(10);
        const securepassword = await bcrypt.hash(newPass, salt);
        const updated = {
            ...updatePersonDto,
            password: securepassword
        };
        const changed = await this.peopleModel.findOneAndUpdate(filter, updated, { new: true });
        if (!changed) {
            throw new common_1.NotFoundException("No Person Foud by that name!");
        }
        return changed;
    }
    async removeByAnyName(name) {
        const found = await this.peopleModel.findOneAndDelete({
            $or: [
                { firstname: name },
                { lastname: name },
            ],
        });
        if (!found) {
            throw new common_1.NotFoundException("Person not found");
        }
        return found;
    }
};
exports.PeopleService = PeopleService;
exports.PeopleService = PeopleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('People')),
    __metadata("design:paramtypes", [mongoose_2.Model, jwt_1.JwtService, config_1.ConfigService])
], PeopleService);
//# sourceMappingURL=people.service.js.map