import { UserRepository } from '@application/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserEntity } from '@application/entities/user/user.entity';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(receivedEmail: string): Promise<UserEntity | null> {
    const user = await this.prisma.users.findUnique({
      where: { email: receivedEmail },
    });
    if (!user) return null;
    return PrismaUserMapper.toDomain(user);
  }

  async findById(receivedId: string): Promise<UserEntity | null> {
    const user = await this.prisma.users.findUnique({
      where: { id: receivedId },
    });
    if (!user) return null;
    return PrismaUserMapper.toDomain(user);
  }

  async delete(receivedId: string): Promise<void> {
    await this.prisma.users.delete({
      where: { id: receivedId },
    });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const raw = PrismaUserMapper.toPrisma(user);
    const createUser = await this.prisma.users.create({
      data: raw,
    });
    return PrismaUserMapper.toDomain(createUser);
  }

  async save(receivedValues: UserEntity): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(receivedValues);
    await this.prisma.users.update({
      where: { id: raw.id },
      data: raw,
    });
  }
}
