import * as bcrypt from 'bcryptjs';
export class Password {
  private readonly passwordHash: string;

  get value(): string {
    return this.passwordHash;
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

  constructor(password: string) {
    const isValid = this.validatePassword(password);

    if (!isValid) throw new Error('Invalid password');

    const hash = HashPassword(password);

    this.passwordHash = hash;
  }
}

function HashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);

  const passwordHash = bcrypt.hashSync(password, salt);
  return passwordHash;
}

/* async compare(password: string, passwordHash: string): Promise<boolean> {
    try {
      const isEqual = await bcrypt.compare(password, passwordHash);
      return isEqual;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  } */
