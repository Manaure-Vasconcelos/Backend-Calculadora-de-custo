import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/application/repositories/user-repository';

@Injectable()
export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(receivedId: number) {
    const deletedUser = await this.userRepository.delete(receivedId);
    return deletedUser;
  }
}
