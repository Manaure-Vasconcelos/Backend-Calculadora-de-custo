import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/application/repositories/user-repository';

interface UserResponse {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

@Injectable()
export class GetUser {
  constructor(private userRepository: UserRepository) {}

  async execute(receivedEmail: string): Promise<UserResponse> {
    try {
      const user = await this.userRepository.findByEmail(receivedEmail);
      if (!user) throw new NotFoundException('Invalid Email');
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        passwordHash: user.password as string,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error; // Propaga a exceção NotFoundException

      throw new InternalServerErrorException('Error executing getUser');
    }
  }
}
