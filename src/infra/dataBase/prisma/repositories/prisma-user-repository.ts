import { PrismaService } from 'src/dataBase/prisma.service';
import { UserRepository } from '../../../../application/repositories/user-repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(name: string, email: string, password: string): Promise<any> {
    try {
      const userCreated = await this.prisma.user.create({
        data: { name, email, password },
      });
      return userCreated;
    } catch (err) {
      throw new NotFoundException(
        'Não foi possível criar o usuário, confira os dados inseridos.',
      );
    }
  }
}
