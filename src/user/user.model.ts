import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    }
});

export const userModel = model('user', userSchema);
