import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Patch,
  HttpCode,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { addMovieToScreen } from './dto/addMovie-toScreen.dto';
import { createTheaterDto } from './dto/create-theater.dto';
import { createScreenDto } from './dto/create.-screen.dto';
import { TheaterService } from './theater.service';

@Controller('theater')
export class TheaterController {
  constructor(private readonly theaterService: TheaterService) {}

  @Post('signup')
  signup(@Body() body: createTheaterDto) {
    return this.theaterService.register(body);
  }

  @HttpCode(200)
  @Post('login')
  signIn(
    @Body() body: createTheaterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.theaterService.login(body, res);
  }
  @Get('getScreens/:id')
  screens(@Param() id: string) {
    return this.theaterService.getScreens(id);
  }
  @Patch('addScreens/:id')
  addScreens(@Param() Id: object, @Body() body: createScreenDto) {
    //@ts-ignore
    const { id } = Id;
    return this.theaterService.screens(body, id);
  }
  @Patch('addMovieToScreen')
  addMovieInScreen(@Body() body: addMovieToScreen) {
    console.log(body);
    return this.theaterService.addMovie(body);
  }

  @Get('getAllMovies')
  getMovies() {
    return this.theaterService.getMovies();
  }
}
