import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/application/repositories/user-repository';
import { UserResponse } from 'src/common/interfaces/userResponse';

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(receivedValues: any): Promise<UserResponse> {
    const { name, email, passwordHash } = receivedValues;
    const userCreated = await this.userRepository.create(
      name,
      email,
      passwordHash,
    );
    return userCreated;
  }
}
