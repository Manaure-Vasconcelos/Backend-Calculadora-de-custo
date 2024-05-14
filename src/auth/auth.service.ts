import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserDTO } from 'src/users/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // criar um createUser e usar aqui para chamar o registro de users no db. ou lidar com isso no userService.
    private jwtService: JwtService,
  ) {}

  async signIn({ name, password }) {
    // Havendo algum erro nessa função.
    const user = await this.usersService.findOne(name);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const { passwordHash, ...payload } = user;
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    return null;
  }

  async register(user: UserDTO) {
    const { name, password } = user;
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const userCreated = await this.usersService.createUser(name, passwordHash);
    return userCreated;
  }

  async createHash(password: any) {
    const createdHash = await bcrypt.hash(password, 10);
    return createdHash;
  }
}
