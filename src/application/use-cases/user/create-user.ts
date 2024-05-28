import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from 'src/application/repositories/user-repository';
import { UserResponse } from 'src/common/interfaces/userResponse';

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(receivedValues: any): Promise<UserResponse> {
    try {
      const { name, email, passwordHash } = receivedValues;
      const userCreated = await this.userRepository.create(
        name,
        email,
        passwordHash,
      );
      return userCreated;
    } catch (error) {
      if (error instanceof ConflictException)
        throw new ConflictException('Email already exists.');

      throw new InternalServerErrorException('Failed to register user.');
    }
  }
}
