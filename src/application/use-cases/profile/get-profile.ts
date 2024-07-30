import { ProfileRepository } from '@application/repositories/profile-repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GetProfile {
  constructor(private profileRepo: ProfileRepository) {}

  async execute(receivedId: string) {
    try {
      return await this.profileRepo.getProfile(receivedId);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
