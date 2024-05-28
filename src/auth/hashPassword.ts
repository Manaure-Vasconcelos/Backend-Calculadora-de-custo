import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashPassword {
  private readonly salt = bcrypt.genSaltSync(10);

  create(password: string): string {
    try {
      const passwordHash = bcrypt.hashSync(password, this.salt);
      return passwordHash;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async compare(password: string, passwordHash: string): Promise<boolean> {
    try {
      const isEqual = await bcrypt.compare(password, passwordHash);
      return isEqual;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
