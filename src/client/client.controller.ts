import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  Req,
  HttpCode,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ClientService } from './client.service';
import { createUserDto } from './dto/create-user.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  test(): string {
    return 'this is working from user controller';
  }

  @Post('/signup')
  signup(@Body() body: createUserDto): any {
    return this.clientService.createUser(body);
  }

  @HttpCode(200)
  @Post('login')
  login(
    @Body() body: createUserDto,
    @Res({ passthrough: true }) response: Response,
  ): any {
    console.log(`from login controller`);
    console.log(body);
    return this.clientService.logIn(body, response);
  }
  @Get('dashboard')
  getDash(@Req() request: Request) {
    return this.clientService.dash(request);
  }
}
