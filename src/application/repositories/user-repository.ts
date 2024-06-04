import { UserEntity } from '@application/entities/user/user.entity';
import { UserUpdateRequest } from '@common/interfaces/userUpdateRequest';

export abstract class UserRepository {
  abstract create(user: UserEntity): Promise<void>;
  abstract findUser(emailUser: string): Promise<UserEntity | null>;
  abstract findUserWithProps(idUser: string): Promise<UserEntity | null>;
  abstract delete(idUser: string): Promise<any>;
  abstract save(receivedValues: UserUpdateRequest): Promise<any>;
}
