import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/application/repositories/user-repository';

@Injectable()
export class GetUser {
  constructor(private userRepository: UserRepository) {}

  async execute(receivedId: number) {
    const user = await this.userRepository.findUserWithRecipes(receivedId);
    return user;
  }
}
