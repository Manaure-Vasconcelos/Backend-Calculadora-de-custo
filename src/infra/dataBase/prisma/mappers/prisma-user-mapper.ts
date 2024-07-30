import { UserEntity } from '@application/entities/user/user.entity';

export class PrismaUserMapper {
  static toPrisma(user: UserEntity) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash:
        typeof user.password !== 'string'
          ? user.password.hashedValue
          : user.password,
    };
  }

  static toDomain(raw: any): UserEntity {
    return new UserEntity({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      password: raw.passwordHash,
      createAt: raw.createAt,
      recipes: raw.recipes,
    });
  }
}
