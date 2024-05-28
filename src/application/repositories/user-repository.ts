import { LoginUserDTO } from 'src/infra/http/DTOs/user-dto';

export abstract class UserRepository {
  abstract create(name: string, email: string, password: string): Promise<any>;
  abstract findUser(emailUser: string): Promise<any>;
  abstract findUserWithProps(idUser: string): Promise<any>;
  abstract delete(idUser: string): Promise<any>;
  abstract update(idUser: string, receivedValues: LoginUserDTO): Promise<any>;
}
