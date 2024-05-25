import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/application/repositories/user-repository';
import { UserUpdateRequest } from 'src/common/interfaces/userUpdateRequest';

@Injectable()
export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(idUser: string, receivedValues: UserUpdateRequest) {
    const updatedUser = await this.userRepository.update(
      idUser,
      receivedValues,
    );
    return updatedUser;
  }
}
