import { UserDTO } from 'src/infra/http/DTOs/user-dto';

export abstract class UserRepository {
  abstract create(name: string, email: string, password: string): Promise<any>;
  abstract findUserWithRecipes(idUser: number): Promise<any>;
  abstract delete(idUser: number): Promise<any>;
  abstract update(idUser: number, receivedValues: UserDTO): Promise<any>;
}
