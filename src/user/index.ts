import { User } from './user';
import { userModel } from './user.model';
import { CreateUserRequest } from './types'
import { HttpError } from '../utils/error/error'
import * as bcrypt from 'bcrypt';

export class UserDao {
    constructor() {

    }

    async find(username: string): Promise<User> {
        try {
            let res: any = await userModel.findOne({ username: username });

            if (!res) {
                throw new HttpError("Invalid username", 400);
            }

            let user = new User(res._id, res.username, res.password);

            return user;

        } catch (error) {
            throw error;
        }
    }

    async findById(id: string): Promise<User> {
        try {
            let res: any = await userModel.findById(id);

            if (!res) {
                throw "Invalid user Id"
            }

            let user = new User(res._id, res.username, res.password);
            return user;

        } catch (error) {
            throw error;
        }
    }

    async create(req: CreateUserRequest) {
        /**
         * this is where we will hash our password 
         * before saving it into the database. 
         */

        let {
            username,
            password,
            email
        } = req;
        try {
            await this.checkUser(username);
            const hashedPassword = await bcrypt.hash(password, 10);

            let res: any = await userModel.create({
                username: username,
                password: hashedPassword,
                email: email
            });

            let user = new User(res.id, res.username, res.password);
            return user;
        } catch (error) {
            throw error;
        }
    }

    private async checkUser(username: string) {
        let user = await userModel.findOne({ username: username });
        if (user) {
            throw "username already taken";
        }
    }
}