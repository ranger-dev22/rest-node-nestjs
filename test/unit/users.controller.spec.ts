import { Request, Response } from '@app/core';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../src/components/users/services/users.service';
import { UsersController } from '../../src/components/users/users.controller';
import * as httpMocks from 'node-mocks-http';
import { INestApplication } from '@nestjs/common';
import { users } from '../mock/users.response';

describe('UsersController', () => {
  let app: INestApplication;
  let usersController: UsersController;

  const mockRequest: Request = httpMocks.createRequest();

  const mockResponse: Response = httpMocks.createResponse();

  const mockParam = 'mockID';

  const mockUsersService = {
    findAll: jest.fn().mockResolvedValue(users),
    findOne: jest.fn().mockResolvedValue(users[0]),
    remove: jest.fn(),
    update: jest.fn(),
    save: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('Testing error cases', async () => {
    mockResponse.error = jest.fn(() => 'error');
    expect(await usersController.getUsers(mockRequest, mockResponse)).toEqual('error');
    expect(await usersController.getUserById(mockRequest, mockResponse, 'mockID')).toEqual('error');
    expect(await usersController.saveUser(mockRequest, mockResponse)).toEqual('error');
    expect(await usersController.deleteUser(mockRequest, mockResponse, 'mockID')).toEqual('error');
    expect(await usersController.updateUserById(mockRequest, mockResponse, 'mockID')).toEqual('error');
  });

  it('Testing usercontroller "getUsers"', async () => {
    mockResponse.success = jest.fn((input) => input);
    expect(await usersController.getUsers(mockRequest, mockResponse)).toEqual(users);
  });

  it('Testing usercontroller "getUserById"', async () => {
    mockResponse.success = jest.fn((input) => input);
    expect(await usersController.getUserById(mockRequest, mockResponse, mockParam)).toEqual(users[0]);
  });
  it('Testing usercontroller "saveUser"', async () => {
    mockResponse.success = jest.fn((input) => input);
    expect(await usersController.saveUser(mockRequest, mockResponse)).toEqual('success');
  });

  it('Testing usercontroller "deleteUser"', async () => {
    mockResponse.success = jest.fn((input) => input);
    expect(await usersController.deleteUser(mockRequest, mockResponse, mockParam)).toEqual('Deletion Successfull');
  });

  it('Testing usercontroller "updateUserById"', async () => {
    mockResponse.success = jest.fn((input) => input);
    expect(await usersController.updateUserById(mockRequest, mockResponse, mockParam)).toEqual('Updation Successfull');
  });
});
