import { randomUUID } from 'node:crypto';

export class UserEntity {
  private readonly id: string = randomUUID();

  constructor(
    private name: string,
    private email: string,
    private password: string,
  ) {}
}
