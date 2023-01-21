import { Theater, TheaterDocument } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AdminRepo } from 'src/admin/admin.repository';
import { addMovieToScreen } from './dto/addMovie-toScreen.dto';
import { createTheaterDto } from './dto/create-theater.dto';
import { createScreenDto } from './dto/create.-screen.dto';

@Injectable()
export class TheaterRepo {
  constructor(
    @InjectModel(Theater.name) private theaterModel: Model<TheaterDocument>,
    private readonly outerRepo: AdminRepo,
  ) {}

  async signup(body: createTheaterDto): Promise<Theater> {
    const Body = new this.theaterModel(body);
    Body.save();
    console.log(Body);
    return Body;
  }
  async findTheater(body: createTheaterDto): Promise<Theater> {
    const { email } = body;
    const Email = this.theaterModel.findOne({ email });
    return Email;
  }

  async screens(id: string): Promise<Theater> {
    const screen = await this.theaterModel.findOne(
      { _id: new Types.ObjectId(id) },
      { screens: 1, _id: 0 },
    );
    return screen;
  }
  async addScreen(body: createScreenDto, id: string): Promise<Theater> {
    return new Promise(async (resolve, reject) => {
      const { name, rows, cols } = body;
      await this.theaterModel
        .findByIdAndUpdate(
          { _id: new Types.ObjectId(id) },
          {
            $push: {
              screens: {
                name: name,
                row: rows,
                col: cols,
              },
            },
          },
        )
        .then((response) => {
          resolve(response);
        });
    });
  }
  async addMoviesInScreen(body: addMovieToScreen): Promise<Theater> {
    try {
      const { screenId, movieId, price, time, screenType } = body;
      const movieAdded = await this.theaterModel.findByIdAndUpdate(
        { _id: new Types.ObjectId(screenId) },
        {
          $set: {
              showInfo: {
                movieId: movieId,
                price: price,
                time: time,
                screenType: screenType,
            },
          },
        },
      );
      return movieAdded;
    } catch (e) {
      console.log('from theaterRepo in addMovieInScreen');
      console.log(e);
    }
  }
  async getAllMovies() {
    const movies = this.outerRepo.getAllMovies();
    return movies;
  }
}
