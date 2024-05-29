export class Name {
  private readonly name: string;

  get value(): string {
    return this.name;
  }

  validateName(name: string) {
    return name.length >= 3 && name.length <= 20;
  }

  constructor(name: string) {
    const isValid = this.validateName(name);

    if (!isValid) throw new Error('Invalid name');

    this.name = name;
  }
}
