import { Injectable, NotFoundException } from '@nestjs/common';

import { UserRepository } from 'src/application/repositories/user-repository';
import { Password } from '@application/entities/user/password';
import { UserEntity } from '@application/entities/user/user.entity';

interface UserUpdateRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

@Injectable()
export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(receivedValues: UserUpdateRequest): Promise<void> {
    let pass: string | undefined = undefined;
    const user = await this.userRepository.findById(receivedValues.id);

    if (!user) throw new NotFoundException();

    // lidar com a mudança de senha => criar novo hash
    if (receivedValues.password) {
      const newPass = new Password(receivedValues.password);
      pass = newPass.hashedValue;
    }

    const newUser = new UserEntity({
      id: receivedValues.id,
      name: receivedValues.name ?? user.name,
      email: receivedValues.email ?? user.email,
      password: pass ?? user.password,
      createAt: user.createAt,
    });
    await this.userRepository.save(newUser);
  }
}
