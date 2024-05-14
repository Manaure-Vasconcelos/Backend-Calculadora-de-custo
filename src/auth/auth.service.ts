import {
  Injectable,
  UnauthorizedException,
  NotAcceptableException,
} from '@nestjs/common';
import { CreateUser } from '../application/use-cases/user/create-user';
import { GetUser } from '../application/use-cases/user/get-user';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/infra/http/DTOs/user-dto';

@Injectable()
export class AuthService {
  constructor(
    private createUser: CreateUser,
    private getUser: GetUser,
    private jwtService: JwtService,
  ) {}

  async sigIn({ email, password }) {
    const user = await this.getUser.execute(email);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      const payload = {
        sub: result.id,
        username: result.name,
        useremail: result.email,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    return new UnauthorizedException();
  }

  async register(user: UserDTO) {
    const { password, ...result } = user;

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const userCreated = await this.createUser.execute({
      ...result,
      passwordHash: passwordHash,
    });
    if (!userCreated) return new NotAcceptableException();
    return userCreated;
  }
}
