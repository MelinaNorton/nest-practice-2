"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PeopleSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isCool: { type: Boolean, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
});
//# sourceMappingURL=people.schema.js.map