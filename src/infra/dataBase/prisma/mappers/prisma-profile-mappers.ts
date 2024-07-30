import { ProfileEntity } from '@application/entities/profile.entity';

export class PrismaProfileMapper {
  static toPrisma(profile: ProfileEntity) {
    return {
      fixedCosts: profile.fixedCost,
      daysOfWorking: profile.daysOfWorking,
      salesPerDay: profile.salesPerDay,
      userId: profile.userId,
    };
  }
  static toDomain(raw: any) {
    return new ProfileEntity({
      fixedCosts: raw.fixedCosts,
      daysOfWorking: raw.daysOfWorking,
      salesPerDay: raw.salesPerDay,
      userId: raw.userId,
    });
  }
}
