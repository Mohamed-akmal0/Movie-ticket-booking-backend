import { Theater, TheaterDocument } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/client/Schema/user.schema';
import { createAdminDto } from './dto/create-admin.dto';
import { Admin, AdminDocument } from './schema/admin.schema';
import {
  Movie,
  MovieDocument,
} from '../../libs/common/src/database/schemas/movie.schema';

@Injectable()
export class AdminRepo {
  constructor(
    @InjectModel(User.name) private readonly clientModel: Model<UserDocument>,
    @InjectModel(Theater.name)
    private readonly theaterModel: Model<TheaterDocument>,
    @InjectModel(Admin.name) private readonly mainModel: Model<AdminDocument>,
    @InjectModel(Movie.name) private readonly movieModal: Model<MovieDocument>,
  ) {}

  async findAdmin(body: createAdminDto): Promise<Admin> {
    const { email } = body;
    const admin = await this.mainModel.findOne({ email }).exec();
    return admin;
  }
  async getClient(): Promise<User[]> {
    try {
      return new Promise(async (resolve, reject) => {
        const client = await this.clientModel.find();
        resolve(client);
      });
    } catch (e) {
      console.log(e);
    }
  }
  async getTheater(): Promise<Theater[]> {
    const theater = await this.theaterModel.find({
      isDelete: false,
      isApproved: false,
    });
    return theater;
  }
  async getApproveTheater(): Promise<Theater[]> {
    try {
      const theater = await this.theaterModel.find({ isApproved: true });
      return theater;
    } catch (e) {
      console.log('from getting approved theater');
      console.log(e);
    }
  }
  async approve(id: string): Promise<Theater> {
    try {
      const theater = await this.theaterModel.findByIdAndUpdate(
        { _id: new Types.ObjectId(id) },
        {
          $set: { isApproved: true },
        },
      );
      return theater;
    } catch (e) {
      console.log('err in adminRepo for approve theater');
    }
  }
  async rejectTheater(id: string): Promise<Theater> {
    try {
      const theater = await this.theaterModel.findByIdAndUpdate(
        { _id: new Types.ObjectId(id) },
        {
          $set: { isDelete: true },
        },
      );
      return theater;
    } catch (e) {
      console.log('err in adminRepo for reject theater');
    }
  }
  async block_theater(id: string): Promise<Theater> {
    console.log(id);
    try {
      const theater = await this.theaterModel.findByIdAndUpdate(
        { _id: new Types.ObjectId(id) },
        {
          $set: { isBlocked: true },
        },
      );
      return theater;
    } catch (e) {
      console.log('from block theater fn in admin repo');
      console.log(e);
    }
  }
  async unBlock_theater(id: string): Promise<Theater> {
    try {
      const theater = await this.theaterModel.findByIdAndUpdate(
        { _id: new Types.ObjectId(id) },
        {
          $set: { isBlocked: false },
        },
      );
      return theater;
    } catch (e) {
      console.log('from unblock theater in admin repo');
      console.log(e);
    }
  }
  async moviesInfo(obj: object): Promise<Movie> {
    try {
      return new Promise(async (resolve, reject) => {
        const movie = await new this.movieModal(obj).save();
        resolve(movie);
      });
    } catch (e) {
      console.log('from adminRepo addMovie', e);
    }
  }
  async getAllMovies(): Promise<Movie[]> {
    try {
      return new Promise(async (resolve, reject) => {
        await this.movieModal.find().then((response) => {
          resolve(response);
        });
      });
    } catch (e) {
      console.log('from adminRepo getAllMovies', e);
    }
  }
}
