import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UserRepo } from './user.repository';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Injectable()
export class ClientService {
  constructor(
    private readonly userRepo: UserRepo,
    private jwtService: JwtService,
  ) {}

  async createUser(body: createUserDto): Promise<any> {
    const salt = 10;
    body.password = await bcrypt.hash(body.password, salt);
    const existEmail = await this.userRepo.findEmail(body);
    if (existEmail != null) {
      throw new UnauthorizedException('email already registered');
    }
    return this.userRepo.createUser(body);
  }

  async logIn(body: createUserDto, response: Response): Promise<any> {
    console.log(body);
    const { password } = body;
    const WE = await this.userRepo.findUser(body);
    console.log(WE);
    if (WE === null) response.json({ message: 'wrong_email' });
    const hp = await bcrypt.compare(password, WE.password);
    console.log(hp);
    if (hp === false) response.json({ message: 'wrong_password' });
    const jwt = await this.jwtService.signAsync({ id: WE._id });
    response.cookie('jwt', jwt, { httpOnly: true, maxAge: 86400 });
    return { message: 'success' };
  }
  async dash(request: Request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    if (!data) throw new UnauthorizedException();
    return data;
  }
}
