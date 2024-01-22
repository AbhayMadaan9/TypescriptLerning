import { UserType } from "Interfaces/Interfaces";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imghash: { type: String },
    password: { type: String, required: true}
})
export const User = mongoose.model('User', UserSchema);
