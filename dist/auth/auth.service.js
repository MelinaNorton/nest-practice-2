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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const people_service_1 = require("../people/people.service");
let AuthService = class AuthService {
    jwtService;
    configService;
    peopleService;
    constructor(jwtService, configService, peopleService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.peopleService = peopleService;
    }
    async signup(createPersonDto) {
        const salt = 10;
        const hashpass = await bcrypt.hash(createPersonDto.password, salt);
        const newUser = await this.peopleService.create({
            ...createPersonDto,
            password: hashpass,
        });
        return newUser;
    }
    async login({ username, password }) {
        const exists = await this.peopleService.findOneByName(username);
        if (!exists) {
            throw new common_1.UnauthorizedException('Invalid Username');
        }
        const match = await bcrypt.compare(password, exists.password);
        if (!match) {
            throw new common_1.UnauthorizedException('Invalid Password');
        }
        const token = this.jwtService.sign({ id: exists.id, }, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRES'),
        });
        return { token };
    }
    async resetPass({ username, password }) {
        if (!username || !password) {
            throw new common_1.NotFoundException("Missing Required Fields");
        }
        const filter = { username: username };
        const changed = await this.peopleService.updatePass(filter, password, { username, password });
        if (!changed) {
            throw new common_1.NotFoundException("User does not exist");
        }
        return changed;
    }
    async forgotPassReset({ username, password, email }) {
        if (!username || !password || !email) {
            throw new common_1.NotFoundException("Missing Required Fields");
        }
        const exists = await this.peopleService.findOneByName(username);
        if (!exists) {
            throw new common_1.NotFoundException("User does not exist");
        }
        const exists_emailcheck = await this.peopleService.findOneByName(email);
        if (!exists_emailcheck) {
            throw new common_1.NotFoundException("Email does not exist");
        }
        const changed = await this.peopleService.updatePass({ username: username }, password, { username, password });
        if (!changed) {
            throw new common_1.NotFoundException("User does not exist");
        }
        return changed;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        people_service_1.PeopleService])
], AuthService);
//# sourceMappingURL=auth.service.js.map