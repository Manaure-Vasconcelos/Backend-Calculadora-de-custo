import { ProfileRepository } from '@application/repositories/profile-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { ProfileEntity } from '@application/entities/profile.entity';
import { PrismaProfileMapper } from '../mappers/prisma-profile-mappers';

@Injectable()
export class PrismaProfileRepository implements ProfileRepository {
  constructor(private prisma: PrismaService) {}

  async getProfile(id: string): Promise<ProfileEntity> {
    const raw = await this.prisma.profile.findUnique({ where: { userId: id } });
    return PrismaProfileMapper.toDomain(raw);
  }

  async save(profile: ProfileEntity): Promise<ProfileEntity> {
    const raw = PrismaProfileMapper.toPrisma(profile);
    const res = await this.prisma.profile.update({
      where: { userId: raw.userId },
      data: raw,
    });
    return PrismaProfileMapper.toDomain(res);
  }
}
