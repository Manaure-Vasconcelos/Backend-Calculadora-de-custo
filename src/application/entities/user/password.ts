import * as bcrypt from 'bcryptjs';

export class Password {
  private readonly password: string;

  constructor(password: string) {
    const isValid = this.validatePassword(password);

    if (!isValid) throw new Error('Invalid password');

    this.password = Password.hashPassword(password);
  }

  get hashedValue(): string {
    return this.password;
  }

  validatePassword(password: string): boolean {
    const isValidLength = password.length >= 8 && password.length <= 20;

    if (!isValidLength) return false;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const isValidValues = passwordRegex.test(password);

    if (!isValidValues) return false;

    return true;
  }

  static hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}

/* async compare(password: string, passwordHash: string): Promise<boolean> {
    try {
      const isEqual = await bcrypt.compare(password, passwordHash);
      return isEqual;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  } */
