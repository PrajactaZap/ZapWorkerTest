import { BaseService } from './baseService.js';
import logger from '../utils/logger.js';

export class UserService extends BaseService {
  constructor(apiClient) {
    super(apiClient);
    this.endpoints = {
      users: '/users',
      login: '/login',
      register: '/register'
    };
  }

  async getUsers(page = 1) {
    logger.info(`UserService: Getting users - Page ${page}`);
    return await this.get(this.endpoints.users, {
      params: { page }
    });
  }

  async getUserById(userId) {
    logger.info(`UserService: Getting user by ID: ${userId}`);
    return await this.get(`${this.endpoints.users}/${userId}`);
  }

  async createUser(userData) {
    logger.info('UserService: Creating new user');
    return await this.post(this.endpoints.users, {
      data: userData
    });
  }

  async updateUser(userId, userData) {
    logger.info(`UserService: Updating user ID: ${userId}`);
    return await this.put(`${this.endpoints.users}/${userId}`, {
      data: userData
    });
  }

  async patchUser(userId, userData) {
    logger.info(`UserService: Patching user ID: ${userId}`);
    return await this.patch(`${this.endpoints.users}/${userId}`, {
      data: userData
    });
  }

  async deleteUser(userId) {
    logger.info(`UserService: Deleting user ID: ${userId}`);
    return await this.delete(`${this.endpoints.users}/${userId}`);
  }

  async login(credentials) {
    logger.info('UserService: Performing login');
    return await this.post(this.endpoints.login, {
      data: credentials
    });
  }

  async register(userData) {
    logger.info('UserService: Registering new user');
    return await this.post(this.endpoints.register, {
      data: userData
    });
  }

  async getUsersWithAuth(token, page = 1) {
    logger.info(`UserService: Getting users with auth - Page ${page}`);
    return await this.get(this.endpoints.users, {
      params: { page },
      token: token
    });
  }

  async createUserWithAuth(token, userData) {
    logger.info('UserService: Creating user with authentication');
    return await this.post(this.endpoints.users, {
      data: userData,
      token: token
    });
  }

  async updateUserWithAuth(token, userId, userData) {
    logger.info(`UserService: Updating user ID: ${userId} with authentication`);
    return await this.put(`${this.endpoints.users}/${userId}`, {
      data: userData,
      token: token
    });
  }

  async deleteUserWithAuth(token, userId) {
    logger.info(`UserService: Deleting user ID: ${userId} with authentication`);
    return await this.delete(`${this.endpoints.users}/${userId}`, {
      token: token
    });
  }
}

export default UserService;
