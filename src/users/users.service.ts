import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db';

export interface ReturnUser {
  id: number;
  name: string;
  passwordHash: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(receivedName: string): Promise<ReturnUser> {
    const user = await this.prisma.users.findFirst({
      where: { name: receivedName },
    });
    return user;
  }

  async createUser(name: string, passwordHash: string) {
    const userCreated = await this.prisma.users.create({
      data: { name, passwordHash },
    });
    return userCreated;
  }
}
