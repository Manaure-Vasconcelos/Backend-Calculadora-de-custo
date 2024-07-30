import { ProfileEntity } from '@application/entities/profile.entity';

export abstract class ProfileRepository {
  abstract getProfile(id: string): Promise<ProfileEntity>;
  abstract save(profile: ProfileEntity): Promise<ProfileEntity>;
}
