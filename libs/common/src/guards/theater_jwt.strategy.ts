import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class TheaterStrategy extends PassportStrategy(Strategy, 'theater_jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('THEATER_SECRET_KEY'),
    });
  }

  validate(payload: any) {
    console.log('theater', payload);
    return payload;
  }
}
