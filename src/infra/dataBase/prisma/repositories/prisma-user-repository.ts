import { UserRepository } from '../../../../application/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserDTO } from 'src/infra/http/DTOs/user-dto';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(name: string, email: string, password: string): Promise<any> {
    const userCreated = await this.prisma.user.create({
      data: { name, email, password },
    });
    if (!userCreated) return null;
    return userCreated;
  }

  async findUserWithRecipes(idUser: number) {
    const user = await this.prisma.user.findFirst({
      where: { id: idUser },
      include: { recipes: true },
    });
    if (!user) return null;
    return user;
  }

  async delete(idUser: number) {
    const deletedUser = await this.prisma.user.delete({
      where: { id: idUser },
    });
    if (!deletedUser) return null;
    return deletedUser;
  }

  async update(idUser: number, receivedValues: UserDTO): Promise<any> {
    const { name, email, password } = receivedValues;
    const updateUser = await this.prisma.user.update({
      where: { id: idUser },
      data: { name, email, password },
    });
    if (!updateUser) return null;
    return updateUser;
  }
}
