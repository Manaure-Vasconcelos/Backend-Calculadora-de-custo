import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/application/repositories/user-repository';
import { UserRequest } from 'src/common/interfaces/userRequest';
import { UserResponse } from 'src/common/interfaces/userResponse';

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(receivedValues: UserRequest): Promise<UserResponse> {
    const { name, email, password } = receivedValues;
    const userCreated = await this.userRepository.create(name, email, password);
    return userCreated;
  }
}
