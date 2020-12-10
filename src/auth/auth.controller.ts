import { Request, Response } from 'express';
import { UserDao } from '../user';
import * as jwt from 'jsonwebtoken';
import { User } from '../user/user';
const userDao = new UserDao();

export const localLogin = (req: Request, res: Response) => {
    let user = <User>req.user;
    try {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        return res.status(200).json({
            token: token,
            username: user.username
        });
    } catch (error) {
        return res.status(404).send('please try again');
    }
}

export const localSignup = async (req: Request, res: Response) => {
    let { username, password } = req.body;

    try {
        let user = await userDao.create({
            username,
            password
        });

        return res.status(201).json(user);

    } catch (error) {
        return res.status(404).send(error);
    }
}