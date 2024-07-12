import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    if (!jwtConstants.secret) throw new Error();

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return JwtStrategy.extractJWTFromCookie(request);
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: Buffer.from(jwtConstants.secret, 'base64'),
      algorithms: ['RS256'],
    });
  }

  private static extractJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.access_token) {
      return req.cookies.access_token;
    }
    return null;
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
    };
  }
}
