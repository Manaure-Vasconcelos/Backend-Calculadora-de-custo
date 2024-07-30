import { ProfileEntity } from '@application/entities/profile.entity';

export class ProfileViewModel {
  static toHTTP(profile: ProfileEntity) {
    return {
      fixedCosts: profile.fixedCost,
      daysOfWorking: profile.daysOfWorking,
      salesPerDay: profile.salesPerDay,
    };
  }
}
