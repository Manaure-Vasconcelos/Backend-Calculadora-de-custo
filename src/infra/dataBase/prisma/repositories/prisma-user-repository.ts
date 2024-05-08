import { UserRepository } from '../../../../application/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserUpdateRequest } from 'src/common/interfaces/userUpdateRequest';

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

  async findUserWithRecipes(receivedId: number) {
    const user = await this.prisma.user.findFirst({
      where: { id: receivedId },
      include: { recipes: true },
    });
    if (!user) return null;
    return user;
  }

  async delete(receivedId: number) {
    const deletedUser = await this.prisma.user.delete({
      where: { id: receivedId },
    });
    if (!deletedUser) return null;
    return deletedUser;
  }

  async update(
    receivedId: number,
    receivedValues: UserUpdateRequest,
  ): Promise<any> {
    const { name, email, password } = receivedValues;
    const updateUser = await this.prisma.user.update({
      where: { id: receivedId },
      data: { name, email, password },
    });
    if (!updateUser) return null;
    return updateUser;
  }
}
