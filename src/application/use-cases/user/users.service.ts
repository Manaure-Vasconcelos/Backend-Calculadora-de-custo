import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDTO } from '../../../infra/http/DTOs/user-dto';
import { UserRepository } from '../../repositories/user-repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: UserDTO) {
    const { name, email, password } = user;
    const userCreated = await this.userRepository.create(name, email, password);
    return userCreated;
    // trata o password_hash e depois setar.
    /*  try {
      const userCreated = await prisma.user.create({ data: user });
      return userCreated;
    } catch (err) {
      throw new NotFoundException(
        'Não foi possível criar o usuário, confira os dados inseridos.',
      );
    } */
  }

  async getAllUsers() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      return new NotFoundException('Não existe nenhum usuário.');
    }
  }

  async findUser(idUser: number) {
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
