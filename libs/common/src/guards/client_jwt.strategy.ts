import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class ClientStrategy extends PassportStrategy(Strategy, 'client_jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // by default this option is false.if we don't specify no problem
      secretOrKey: config.get<string>('CLIENT_SECRET_KET'),
    });
  }

  validate(payload: any) {
    console.log(payload);
    return payload;
  }
}
