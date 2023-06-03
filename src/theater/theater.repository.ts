import {  Theater, TheaterDocument } from '@app/common';
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
    const allScreens = await this.theaterModel.findOne({
      _id: new Types.ObjectId(id),
    },{
      screens :1,
      _id : 0
    });
    return allScreens;
  }
  async addScreen(body: createScreenDto): Promise<Theater> {
    try {
      const {theaterId, name , cols , rows} = body
      let addedScreen = await this.theaterModel.findOneAndUpdate({_id : new Types.ObjectId(theaterId)},{
        $push:{
          screens:{
            name : name,
            row : rows,
            col : cols,
          }
        }
      });
      return addedScreen;
    } catch (e) {
      console.log(e);
    }
  }
  async addMoviesInScreen(body : addMovieToScreen) : Promise<Theater>{
    try{
      console.log(body)
      const {screenId,movieId,addedMovie , theaterId} = body
      console.log(screenId)
      const {price , time , screenType} = addedMovie
      // const demo = await this.theaterModel.findOne({_id : new Types.ObjectId(theaterId)},
      // {screens : {$elemMatch:{_id:new Types.ObjectId(screenId)}}})
      // console.log(demo)
      const movieAdded = await this.theaterModel.findOneAndUpdate({_id:new Types.ObjectId(theaterId)},
      {screens: {$elemMatch:{_id:new Types.ObjectId(screenId)}}},
      {
        $push:{
          screens:{
            movieId : movieId,
            screenType : screenType,
            price : price,
            time : time
          }
        }
      })
      console.log(movieAdded)
      return 
    }catch(e){
      console.log(e)
    }
  }
  async getAllMovies() {
    const movies = this.outerRepo.getAllMovies();
    return movies;
  }
}
