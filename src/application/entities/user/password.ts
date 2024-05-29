export class Password {
  private readonly password: string;

  get value(): string {
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

  constructor(password: string) {
    const isValid = this.validatePassword(password);

    /* const isValidValues = this. */

    if (!isValid) throw new Error('Invalid password');

    this.password = password;
  }
}
