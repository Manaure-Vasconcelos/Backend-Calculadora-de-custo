import { UserRepository } from '@application/repositories/user-repository';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserUpdateRequest } from 'src/common/interfaces/userUpdateRequest';
import { UserResponse } from 'src/common/interfaces/userResponse';
import { randomUUID } from 'node:crypto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    name: string,
    email: string,
    passwordHash: string,
  ): Promise<UserResponse> {
    try {
      const userId = randomUUID();
      const userCreated = await this.prisma.users.create({
        data: { id: userId, name, email, passwordHash },
      });
      return userCreated;
    } catch (error: any) {
      if (error.code === 'P2002')
        throw new ConflictException('Email already exists.');

      throw new InternalServerErrorException(error);
    }
  }

  async findUserWithProps(receivedId: string): Promise<UserResponse | null> {
    try {
      const user = await this.prisma.users.findUnique({
        where: { id: receivedId },
        include: { recipes: true },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error finding user');
    }
  }

  async findUser(receivedEmail: string): Promise<UserResponse | null> {
    try {
      const user = await this.prisma.users.findUnique({
        where: { email: receivedEmail },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error finding user');
    }
  }

  async delete(receivedId: string): Promise<void> {
    try {
      await this.prisma.users.delete({
        where: { id: receivedId },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // P2025 é o código de erro do Prisma para "Record to delete does not exist."
        if (error.code === 'P2025') {
          throw new NotFoundException({
            message: 'User not founded',
          });
        }
      }

      throw new InternalServerErrorException('Error on delete user');
    }
  }

  async update(
    receivedId: string,
    receivedValues: UserUpdateRequest,
  ): Promise<UserResponse> {
    try {
      const { name, email, password: passwordHash } = receivedValues;
      const updateUser = await this.prisma.users.update({
        where: { id: receivedId },
        data: { name, email, passwordHash },
      });
      return updateUser;
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Not success updating',
      });
    }
  }
}
