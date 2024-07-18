import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Request } from 'express';

interface ReturnValidate {
  id: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    if (!jwtConstants.secret) throw new Error();

    super({
      jwtFromRequest: JwtStrategy.cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: Buffer.from(jwtConstants.secret, 'base64'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: { sub: string }): Promise<ReturnValidate> {
    return {
      id: payload.sub,
    };
  }

  static cookieExtractor = (req: Request) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['access_token'];
    }
    return token;
  };
}
