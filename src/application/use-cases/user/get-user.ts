import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/application/repositories/user-repository';
import { UserResponse } from 'src/common/interfaces/userResponse';

@Injectable()
export class GetUser {
  constructor(private userRepository: UserRepository) {}

  async execute(receivedEmail: string): Promise<UserResponse> {
    const user = await this.userRepository.findUserWithRecipes(receivedEmail);
    return user;
  }
}
