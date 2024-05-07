import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/application/repositories/user-repository';

interface UserRequest {
  name: string;
  email: string;
  password: string;
}
@Injectable()
export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(idUser: number, receivedValues: UserRequest) {
    const updatedUser = await this.userRepository.update(
      idUser,
      receivedValues,
    );
    return updatedUser;
  }
}
