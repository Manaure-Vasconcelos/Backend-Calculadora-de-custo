import { UserEntity } from '@application/entities/user/user.entity';
import { UserResponse } from '@common/interfaces/userResponse';
import { UserUpdateRequest } from '@common/interfaces/userUpdateRequest';

export abstract class UserRepository {
  abstract create(user: UserEntity): Promise<void>;
  abstract findUser(emailUser: string): Promise<UserResponse | null>;
  abstract findUserWithProps(idUser: string): Promise<UserResponse | null>;
  abstract delete(idUser: string): Promise<any>;
  abstract save(receivedValues: UserUpdateRequest): Promise<any>;
}
