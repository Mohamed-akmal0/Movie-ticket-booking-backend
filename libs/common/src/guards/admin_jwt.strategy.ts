import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'admin_jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, //this make sure that token is not expired
      secretOrKey: config.get<string>('ADMIN_SECRET_KEY'),
    });
    //console.log(config.get<string>('ADMIN_SECRET_KEY')) // NestJs way of accessing env variables
    //console.log(process.env.ADMIN_SECRET_KEY) // Express way of accessing env variables
  }
  async validate(payload: any) {
    console.log(payload);
    return payload;
  }
}
