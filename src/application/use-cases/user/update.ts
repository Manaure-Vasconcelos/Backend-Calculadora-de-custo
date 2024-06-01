import { Injectable } from '@nestjs/common';

import { UserRepository } from 'src/application/repositories/user-repository';
import { Password } from '@application/entities/user/password';
import { UserUpdateRequest } from '@common/interfaces/userUpdateRequest';

@Injectable()
export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(receivedValues: UserUpdateRequest): Promise<void> {
    // lidar com a mudança de senha => criar novo hash
    if (typeof receivedValues.password === 'string') {
      const newPass = new Password(receivedValues.password);
      await this.userRepository.save({
        id: receivedValues.id,
        name: receivedValues.name,
        email: receivedValues.email,
        password: newPass.hashedValue,
      });
      return;
    }

    await this.userRepository.save(receivedValues);
  }
}
