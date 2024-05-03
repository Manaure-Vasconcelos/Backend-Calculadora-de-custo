import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../db';
import { userDTO } from './DTO/user-dto';
import { PrismaService } from 'src/dataBase/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(user: userDTO) {
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

  async getAllUsers() {
    const users = await prisma.users.findMany();
    if (!users.length)
      return new NotFoundException('Não existe nenhum usuário.');
    return users;
  }

  async getUser(idUser: number) {
    const user = await prisma.users.findFirst({ where: { id: idUser } });
    if (!user) return new NotFoundException(`Não existe nenhum usuário.`);
    return user;
  }

  async deleteUser(idUser: number) {
    try {
      const userDelete = await prisma.users.delete({ where: { id: idUser } });
      return userDelete;
    } catch (err) {
      throw new NotFoundException('Não foi possível delete o usuário.');
    }
  }

  async updateUser(idUser: number, userUpdate: string) {
    try {
      const updateUser = await prisma.users.update({
        where: { id: idUser },
        data: userUpdate,
      });
      return updateUser;
    } catch (err) {
      throw new NotFoundException('Não foi possível delete o usuário.');
    }
  }
}
