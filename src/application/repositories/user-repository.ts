import { UserDTO } from 'src/infra/http/DTOs/user-dto';

export abstract class UserRepository {
  abstract create(name: string, email: string, password: string): Promise<void>;
  abstract getAllUsers(): Promise<void>;
  abstract findUser(idUser: number): Promise<any>;
  abstract deleteUser(idUser: number): Promise<any>;
  abstract updateUser(idUser: number, receivedValues: UserDTO): Promise<any>;
}
