import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../db';

@Injectable()
export class UsersService {
  async getAllUsers() {
    const users = await prisma.users.findMany();
    if (!users.length)
      return new NotFoundException('Não existe nenhum usuário.');
    return users;
  }

  async createUser(user: any) {
    // trata o password_hash e depois setar.
    try {
      const userCreated = await prisma.users.create({ data: user });
      return userCreated;
    } catch (err) {
      throw new NotFoundException(
        'Não foi possível criar o usuário, confira os dados inseridos.',
      );
    }
  }

  async deleteUser(idUser: any) {
    try {
      const userDelete = await prisma.users.delete({ where: { id: idUser } });
      return userDelete;
    } catch (err) {
      throw new NotFoundException('Não foi possível delete o usuário.');
    }
  }
}
