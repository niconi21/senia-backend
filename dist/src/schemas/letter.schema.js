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
exports.Letter = exports.NAME_LETTERS = exports.TYPES_LETTERS = exports.HANDS_LETTER = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const image_schema_1 = require("./image.schema");
const user_schema_1 = require("./user.schema");
exports.HANDS_LETTER = ["Izquierda", "Derecha"];
exports.TYPES_LETTERS = ["Entrenamiento", "Validación"];
exports.NAME_LETTERS = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "LL",
    "M",
    "N",
    "Ñ",
    "O",
    "P",
    "Q",
    "R",
    "RR",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];
let Letter = class Letter {
    getPathLetter() {
        var _a;
        return `../public/${(_a = this.user) === null || _a === void 0 ? void 0 : _a.toString()}/${this.name}/${this.hand}/${this.type}`;
    }
};
__decorate([
    (0, typegoose_1.prop)({ requied: true, enum: exports.NAME_LETTERS }),
    __metadata("design:type", String)
], Letter.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: exports.TYPES_LETTERS }),
    __metadata("design:type", String)
], Letter.prototype, "type", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: exports.HANDS_LETTER }),
    __metadata("design:type", String)
], Letter.prototype, "hand", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Letter.prototype, "percentage", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], Letter.prototype, "createdAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [image_schema_1.Image] }),
    __metadata("design:type", Array)
], Letter.prototype, "images", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => user_schema_1.User }),
    __metadata("design:type", Object)
], Letter.prototype, "user", void 0);
Letter = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: { createdAt: true, updatedAt: false },
        },
    })
], Letter);
exports.Letter = Letter;
const LetterSchema = (0, typegoose_1.getModelForClass)(Letter);
exports.default = LetterSchema;
