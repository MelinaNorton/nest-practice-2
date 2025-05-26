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
exports.PeopleController = void 0;
const common_1 = require("@nestjs/common");
const create_person_dto_1 = require("./dto/create-person.dto");
const query_people_dto_1 = require("./dto/query-people.dto");
const update_person_dto_1 = require("./dto/update-person.dto");
const people_service_1 = require("./people.service");
let PeopleController = class PeopleController {
    peopleService;
    constructor(peopleService) {
        this.peopleService = peopleService;
    }
    create(createPersonDto) {
        return this.peopleService.create(createPersonDto);
    }
    findAll(query) {
        return this.peopleService.findAll(query);
    }
    findOne(name) {
        return this.peopleService.findOneByName(name);
    }
    findOneEmail(name) {
        return this.peopleService.findEmailAnyName(name);
    }
    getLastfromFirst(firstname) {
        return this.peopleService.findLastFromFirst(firstname);
    }
    getFirstFromLast(lastname) {
        return this.peopleService.findFirstFromLast(lastname);
    }
    getAgeFromName(name) {
        return this.peopleService.findAgeFromName(name);
    }
    update(firstnameparam, newFirstName, updatePersonDto) {
        const filter = { firstname: firstnameparam };
        return this.peopleService.updateFirstName(filter, newFirstName, updatePersonDto);
    }
    remove(name) {
        return this.peopleService.removeByAnyName(name);
    }
};
exports.PeopleController = PeopleController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_person_dto_1.CreatePersonDto]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_people_dto_1.QueryPeopleDto]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':name/email'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "findOneEmail", null);
__decorate([
    (0, common_1.Get)(':firstname/lastname'),
    __param(0, (0, common_1.Param)('firstname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "getLastfromFirst", null);
__decorate([
    (0, common_1.Get)(':lastname/firstname'),
    __param(0, (0, common_1.Param)('lastname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "getFirstFromLast", null);
__decorate([
    (0, common_1.Get)(':name/age'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "getAgeFromName", null);
__decorate([
    (0, common_1.Patch)(':firstname'),
    __param(0, (0, common_1.Param)('firstname')),
    __param(1, (0, common_1.Body)('newFirstName')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_person_dto_1.UpdatePersonDto]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "remove", null);
exports.PeopleController = PeopleController = __decorate([
    (0, common_1.Controller)('people'),
    __metadata("design:paramtypes", [people_service_1.PeopleService])
], PeopleController);
//# sourceMappingURL=people.controller.js.map