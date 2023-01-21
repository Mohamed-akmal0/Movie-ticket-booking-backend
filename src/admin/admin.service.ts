import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createAdminDto } from './dto/create-admin.dto';
import { AdminRepo } from './admin.repository';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schema/admin.schema';
import { Model } from 'mongoose';
import { createMovieDto } from './dto/create-movie.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepo: AdminRepo,
    private readonly jwtService: JwtService,
    @InjectModel(Admin.name) private mainModel: Model<AdminDocument>,
  ) {}
  async register(body: createAdminDto): Promise<Admin> {
    const ad = new this.mainModel(body);
    ad.save();
    console.log(ad);
    return ad;
  }

  async login(body: createAdminDto, response: Response): Promise<any> {
    const adminExist = await this.adminRepo.findAdmin(body);
    if (adminExist === null) throw new UnauthorizedException('not found');
    const { password, _id } = adminExist;

    if (body.password != password) response.json({ message: 'wrong_pass' });

    const jwt: string = await this.jwtService.signAsync({ id: _id });
    response.cookie('admin_jwt', jwt, { httpOnly: false });
    return { message: 'success' };
  }

  async clients(): Promise<any> {
    const clients = await this.adminRepo.getClient();
    return clients;
  }
  async theater(): Promise<any> {
    const theater = await this.adminRepo.getTheater();
    return theater;
  }
  async get(): Promise<any> {
    const approveTheater = await this.adminRepo.getApproveTheater();
    return approveTheater;
  }
  async approve(id: string): Promise<any> {
    await this.adminRepo.approve(id);
    return { message: 'approved' };
  }
  async reject(id: string): Promise<any> {
    await this.adminRepo.rejectTheater(id);
    return { message: 'rejected' };
  }
  async blockTheater(id: string): Promise<any> {
    const theater = await this.adminRepo.block_theater(id);
    return theater;
  }
  async unBlockTheater(id: string): Promise<any> {
    const theater = await this.adminRepo.unBlock_theater(id);
    return theater;
  }
  async addMovie(body: createMovieDto) {
    const { title, description, duration, date, director, link, genre } = body;
    const obj = { title, description, duration, date, director, link, genre };
    const movie = await this.adminRepo.moviesInfo(obj);
    return movie;
  }
  async getMovies() {
    const movies = await this.adminRepo.getAllMovies();
    return movies;
  }
}
