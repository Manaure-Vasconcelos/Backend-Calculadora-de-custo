import { Injectable, UnauthorizedException } from '@nestjs/common';
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
      const { passwordHash, ...result } = user;
      const payload = { sub: result.id, username: result.name };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    return new UnauthorizedException();
  }

  async register(user: UserDTO) {
    const { name, password } = user;
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const userCreated = await this.usersService.createUser(name, passwordHash);
    return userCreated;
  }
}
