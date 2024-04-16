import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersDto } from './dto/users-dto';

@Injectable()
export class UsersService {
  private users = [];
  getUsers() {
    if (!this.users.length) return new NotFoundException('Users is empty');
    return this.users;
  }

  createUser(user: UsersDto) {
    this.users.push({ ...user, id: this.users.length + 1 });
    return user;
  }
}
