import { Injectable } from '@nestjs/common';

import { UserRequest } from '@common/interfaces/userRequest';
import { UserRepository } from 'src/application/repositories/user-repository';

@Injectable()
export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(idUser: string, receivedValues: Partial<UserRequest>) {
    // lidar com a mudança de senha => criar novo hash
    const updatedUser = await this.userRepository.update(
      idUser,
      receivedValues,
    );
    return updatedUser;
  }
}
