import { UserDTO } from 'src/infra/http/DTOs/user-dto';

export abstract class UserRepository {
  abstract create(name: string, email: string, password: string): Promise<any>;
  abstract findUserWithRecipes(emailUser: string): Promise<any>;
  abstract delete(idUser: string): Promise<any>;
  abstract update(idUser: string, receivedValues: UserDTO): Promise<any>;
}
