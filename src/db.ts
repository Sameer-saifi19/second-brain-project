import { hash } from 'bcrypt';
import mongoose from 'mongoose';
import { any, ParseStatus, string } from "zod";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

mongoose.connect("mongodb+srv://user1:CSA123@cluster0.e4e43lo.mongodb.net/brainly")

const userSchema = new Schema({
    username: {type:String, unique:true},
    password: String
})

export const userModel = mongoose.model("user", userSchema);

const contentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: ObjectId, ref:'Tag'},],
    userId: {type: ObjectId, ref:'user', required: true}
})

export const contentModel  = mongoose.model("content", contentSchema)

const linkSchema = new Schema({
    hash: String,
    userId: {type: ObjectId, ref: 'User', required: true, unique: true },
})

export const linkModel = mongoose.model("link", linkSchema);