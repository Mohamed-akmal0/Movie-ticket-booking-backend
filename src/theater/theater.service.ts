import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createTheaterDto } from './dto/create-theater.dto';
import { TheaterRepo } from './theater.repository';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { createScreenDto } from './dto/create.-screen.dto';
import { addMovieToScreen } from './dto/addMovie-toScreen.dto';

@Injectable()
export class TheaterService {
  constructor(
    private readonly theaterRepo: TheaterRepo,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: createTheaterDto): Promise<any> {
    const existEmail = await this.theaterRepo.findTheater(body);
    if (existEmail !== null) throw new UnauthorizedException('registered');
    const salt = 10;
    body.password = await bcrypt.hash(body.password, salt);
    await this.theaterRepo.signup(body);
    return { message: 'success' };
  }
  async login(body: createTheaterDto, res: Response): Promise<any> {
    const { password } = body;
    const theater = await this.theaterRepo.findTheater(body);
    const { isApproved, _id, isDelete, isBlocked } = theater;
    if (isApproved === false) res.json({ message: 'notApproved' });
    if (isDelete != false) res.json({ message: 'rejected' });
    if (isBlocked != false) res.json({ message: 'blocked' });
    const hp = await bcrypt.compare(password, theater.password);
    if (hp === false) res.json({ message: 'wrong_password' });
    const jwt = await this.jwtService.signAsync({ id: _id });
    res.cookie('theaterToken', jwt, { httpOnly: false });
    return { message: 'success' };
  }
  async getScreens(id: string): Promise<any> {
    const getAddedScreens = await this.theaterRepo.screens(id);
    return getAddedScreens;
  }
  async screens(body: createScreenDto, id: string): Promise<any> {
    const screens = await this.theaterRepo.addScreen(body, id);
    return screens;
  }
  async addMovie(body: addMovieToScreen) {
    const addedMovie = await this.theaterRepo.addMoviesInScreen(body);
    console.log(addedMovie);
    return addedMovie;
  }
  async getMovies() {
    const AllMovies = await this.theaterRepo.getAllMovies();
    return AllMovies;
  }
}
