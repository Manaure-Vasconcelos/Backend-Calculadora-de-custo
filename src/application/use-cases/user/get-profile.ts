import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/application/repositories/user-repository';

@Injectable()
export class GetUserWithProps {
  constructor(private userRepository: UserRepository) {}

  async execute(receivedId: string) {
    try {
      const userWithPros =
        await this.userRepository.findUserWithProps(receivedId);

      if (!userWithPros) throw new NotFoundException('NotFound User');

      return userWithPros;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Error executing getUser');
    }
  }
}
