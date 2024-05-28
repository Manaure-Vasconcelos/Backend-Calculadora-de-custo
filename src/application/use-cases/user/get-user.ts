import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/application/repositories/user-repository';
import { UserResponse } from 'src/common/interfaces/userResponse';

@Injectable()
export class GetUser {
  constructor(private userRepository: UserRepository) {}

  async execute(receivedEmail: string): Promise<UserResponse> {
    try {
      const user = await this.userRepository.findUser(receivedEmail);
      if (!user) throw new NotFoundException('Invalid Email');
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error; // Propaga a exceção NotFoundException

      throw new InternalServerErrorException('Error executing getUser');
    }
  }
}
