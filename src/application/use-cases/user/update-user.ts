import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/application/repositories/user-repository';
import { UserUpdateRequest } from 'src/common/interfaces/userUpdateRequest';

@Injectable()
export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(idUser: string, receivedValues: UserUpdateRequest) {
    // lidar com a mudança de senha => criar novo hash
    const updatedUser = await this.userRepository.update(
      idUser,
      receivedValues,
    );
    return updatedUser;
  }
}
