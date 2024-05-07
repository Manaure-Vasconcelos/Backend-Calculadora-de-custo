import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/application/repositories/user-repository';

// implementa a interface aqui mesmo.
interface UserRequest {
  name: string;
  email: string;
  password: string;
}

interface UserResponse {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(receivedValues: UserRequest): Promise<UserResponse> {
    const { name, email, password } = receivedValues;
    const userCreated = await this.userRepository.create(name, email, password);
    return userCreated;
  }
}
