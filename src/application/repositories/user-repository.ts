import { ProfileEntity } from '@application/entities/profile.entity';
import { UserEntity } from '@application/entities/user/user.entity';

export abstract class UserRepository {
  abstract create(
    user: UserEntity,
    profile: ProfileEntity,
  ): Promise<UserEntity>;
  abstract findByEmail(emailUser: string): Promise<UserEntity | null>;
  abstract findById(userId: string): Promise<UserEntity | null>;
  abstract delete(idUser: string): Promise<any>;
  abstract save(receivedValues: UserEntity): Promise<any>;
}
