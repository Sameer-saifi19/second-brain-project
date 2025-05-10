"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ObjectId = mongoose_1.default.Types.ObjectId;
mongoose_1.default.connect("mongodb+srv://user1:CSA123@cluster0.e4e43lo.mongodb.net/brainly");
const userSchema = new Schema({
    username: { type: String, unique: true },
    password: String
});
exports.userModel = mongoose_1.default.model("user", userSchema);
const contentSchema = new Schema({
    title: String,
    link: String,
    tags: [{ type: ObjectId, ref: 'Tag' },],
    userId: { type: ObjectId, ref: 'user', required: true }
});
exports.contentModel = mongoose_1.default.model("content", contentSchema);
const linkSchema = new Schema({
    hash: String,
    userId: { type: ObjectId, ref: 'User', required: true, unique: true },
});
exports.linkModel = mongoose_1.default.model("link", linkSchema);
