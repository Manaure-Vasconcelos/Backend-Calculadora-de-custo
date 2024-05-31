import { UserEntity } from '@application/entities/user/user.entity';
import { UserRequest } from '@common/interfaces/userRequest';
import { UserResponse } from '@common/interfaces/userResponse';

export abstract class UserRepository {
  abstract create(user: UserEntity): Promise<void>;
  abstract findUser(emailUser: string): Promise<UserResponse | null>;
  abstract findUserWithProps(idUser: string): Promise<UserResponse | null>;
  abstract delete(idUser: string): Promise<any>;
  abstract update(
    idUser: string,
    receivedValues: Partial<UserRequest>,
  ): Promise<any>;
}
