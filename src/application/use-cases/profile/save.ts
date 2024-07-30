import { ProfileRepository } from '@application/repositories/profile-repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetProfile } from './get-profile';
import { ProfileEntity } from '@application/entities/profile.entity';

interface ProfilePatchProps {
  fixedCosts?: number;
  daysOfWorking?: number;
  salesPerDay?: number;
}

@Injectable()
export class SaveProfile {
  constructor(
    private profileRepo: ProfileRepository,
    private getProfile: GetProfile,
  ) {}

  async execute(
    userId: string,
    profilePatch: ProfilePatchProps,
  ): Promise<ProfileEntity> {
    const profile = await this.getProfile.execute(userId);

    if (!profile) throw new NotFoundException();

    const newProfile = new ProfileEntity({
      fixedCosts: profilePatch.fixedCosts ?? profile.fixedCost,
      daysOfWorking: profilePatch.daysOfWorking ?? profile.daysOfWorking,
      salesPerDay: profilePatch.salesPerDay ?? profile.salesPerDay,
      userId: userId,
    });

    return await this.profileRepo.save(newProfile);
  }
}
