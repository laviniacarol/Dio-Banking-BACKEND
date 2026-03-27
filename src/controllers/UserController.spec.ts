import { UserService } from "../services/UserService";
import { UserController } from "./UserController";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { Request } from "express";

describe('UserController', () => {

    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUser: jest.fn()
    };

    const userController = new UserController(mockUserService as UserService);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Hugo',
                email: 'hugo@test.com'
            }
        } as Request;

        const mockResponse = makeMockResponse();

        userController.createUser(mockRequest, mockResponse);

        expect(mockResponse.state.status).toBe(201);
        expect(mockResponse.state.json).toMatchObject({
            message: 'Usuário Criado'
        });

        expect(mockUserService.createUser).toHaveBeenCalledWith(
            'Hugo',
            'hugo@test.com'
        );
    });

    it('Deve retornar erro se name não for informado', () => {
        const mockRequest = makeMockRequest({
            body: {
                name: '',
                email: 'teste@email.com'
            }
        });

        const mockResponse = makeMockResponse();

        userController.createUser(mockRequest, mockResponse);

        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({
            message: 'Bad Request: User.Name obrigatório'
        });

        expect(mockUserService.createUser).not.toHaveBeenCalled();
    });

    it('Deve retornar erro se email não for informado', () => {
        const mockRequest = makeMockRequest({
            body: {
                name: 'Hugo',
                email: ''
            }
        });

        const mockResponse = makeMockResponse();

        userController.createUser(mockRequest, mockResponse);

        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({
            message: 'Bad Request: User.Email obrigatório'
        });

        expect(mockUserService.createUser).not.toHaveBeenCalled();
    });

    it('Deve chamar getAllUser', () => {
        (mockUserService.getAllUser as jest.Mock).mockReturnValue([]);

        const mockRequest = makeMockRequest();
        const mockResponse = makeMockResponse();

        userController.getAllUser(mockRequest, mockResponse);

        expect(mockUserService.getAllUser).toHaveBeenCalled();
        expect(mockResponse.state.status).toBe(200);
    });

    it('Deve deletar um usuário', () => {
    mockUserService.deleteUser = jest.fn();

    const mockRequest = makeMockRequest({
        params: {
            email: 'teste@email.com'
        }
    });

    const mockResponse = makeMockResponse();

    userController.deleteUser(mockRequest, mockResponse);

    expect(mockUserService.deleteUser).toHaveBeenCalledWith('teste@email.com');
    expect(mockResponse.state.status).toBe(200);
    expect(mockResponse.state.json).toMatchObject({
        message: 'Usuário deletado'
    });
});
});