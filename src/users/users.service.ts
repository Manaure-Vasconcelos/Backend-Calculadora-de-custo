import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { name: 'Ronaldo', surname: 'Fenomeno', years: 52 },
    { name: 'Ronaldo', surname: 'Fenomeno', years: 52 },
    { name: 'Ronaldo', surname: 'Fenomeno', years: 52 },
  ];
  getUsers() {
    return this.users;
  }
}
