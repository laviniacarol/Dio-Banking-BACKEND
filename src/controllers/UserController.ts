import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    userService: UserService;

    constructor(userService = new UserService()) {
        this.userService = userService;
    }

    createUser = (request: Request, response: Response) => {
        const { name, email } = request.body;

        if (!name) {
            return response.status(400).json({
                message: 'Bad Request: User.Name obrigatório'
            });
        }

        if (!email) {
            return response.status(400).json({
                message: 'Bad Request: User.Email obrigatório'
            });
        }

        this.userService.createUser(name, email);

        return response.status(201).json({
            message: 'Usuário Criado'
        });
    };

    getAllUser = (request: Request, response: Response) => {
        const users = this.userService.getAllUser();
        return response.status(200).json(users);
    };

   deleteUser = (request: Request, response: Response) => {
    const email = request.params.email as string;

    if (!email) {
        return response.status(400).json({
            message: 'Bad Request: Email obrigatório'
        });
    }

    try {
        this.userService.deleteUser(email);

        return response.status(200).json({
            message: 'Usuário deletado'
        });
    } catch (error) {
        if (error instanceof Error) {
            return response.status(404).json({
                message: error.message
            });
        }

        return response.status(500).json({
            message: 'Internal server error'
        });
    }
};
};
