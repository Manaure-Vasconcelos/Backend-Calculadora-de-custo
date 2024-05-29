export class Email {
  private readonly email: string;

  get value(): string {
    return this.email;
  }

  validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  constructor(email: string) {
    const isValid = this.validateEmail(email);

    if (!isValid) throw new Error('Invalid email');

    this.email = email;
  }
}
