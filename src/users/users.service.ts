import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../db';
import { userDTO } from '../DTO/user-dto';
import { PrismaService } from 'src/dataBase/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(user: userDTO) {
    // trata o password_hash e depois setar.
    try {
      const userCreated = await prisma.user.create({ data: user });
      return userCreated;
    } catch (err) {
      throw new NotFoundException(
        'Não foi possível criar o usuário, confira os dados inseridos.',
      );
    }
  }

  async getAllUsers() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      return new NotFoundException('Não existe nenhum usuário.');
    }
  }

  async getUser(idUser: number) {
    try {
      const user = await prisma.user.findFirst({
        where: { id: idUser },
        include: { recipes: true },
      });
      return user;
    } catch (error) {
      return new NotFoundException(`Não existe nenhum usuário.`);
    }
  }

  async deleteUser(idUser: number) {
    try {
      const userDelete = await prisma.user.delete({ where: { id: idUser } });
      return userDelete;
    } catch (err) {
      throw new NotFoundException('Não foi possível delete o usuário.');
    }
  }

  async updateUser(idUser: number, userUpdate: string) {
    try {
      const updateUser = await prisma.user.update({
        where: { id: idUser },
        data: userUpdate,
      });
      return updateUser;
    } catch (err) {
      throw new NotFoundException('Não foi possível delete o usuário.');
    }
  }
}
