import {Request, Response} from "express";
import UserService from "../service/UserService";

export default class UserController {
    private userService = new UserService();

    login = async (req: Request, res: Response) => {
        const token = await this.userService.login(req, res);
        res.status(200).json({
            message: "Login successful",
            token: token,
        });
    }

    register = async (req: Request, res: Response) => {
        const user = await this.userService.register(req, res);
        res.status(201).json({
            message: "User created successfully",
            user: user,
        });
    }
}