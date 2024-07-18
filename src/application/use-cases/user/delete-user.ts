import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/application/repositories/user-repository';

@Injectable()
export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(receivedId: string) {
    try {
      await this.userRepository.delete(receivedId);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException();
    }
  }
}
