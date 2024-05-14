import { UserRepository } from '../../../../application/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserUpdateRequest } from 'src/common/interfaces/userUpdateRequest';
import { UserResponse } from 'src/common/interfaces/userResponse';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    name: string,
    email: string,
    passwordHash: string,
  ): Promise<UserResponse> {
    const userCreated = await this.prisma.users.create({
      data: { name, email, passwordHash },
    });
    if (!userCreated) return null;
    return userCreated;
  }

  async findUserWithRecipes(receivedEmail: string): Promise<UserResponse> {
    const user = await this.prisma.users.findUnique({
      where: { email: receivedEmail },
      include: { recipes: true },
    });
    if (!user) return null;
    return user;
  }

  async delete(receivedId: number) {
    const deletedUser = await this.prisma.users.delete({
      where: { id: receivedId },
    });
    if (!deletedUser) return null;
    return deletedUser;
  }

  async update(
    receivedId: number,
    receivedValues: UserUpdateRequest,
  ): Promise<any> {
    const { name, email, password: passwordHash } = receivedValues;
    const updateUser = await this.prisma.users.update({
      where: { id: receivedId },
      data: { name, email, passwordHash },
    });
    if (!updateUser) return null;
    return updateUser;
  }
}
