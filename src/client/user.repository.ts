import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './Schema/user.schema';

@Injectable()
export class UserRepo {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(body: createUserDto): Promise<User> {
    try {
      const client = new this.userModel(body);
      client.save();
      return client;
    } catch (e) {
      console.log(e);
      return e.message;
    }
  }
  async findEmail(body: createUserDto): Promise<User> {
    try {
      const { email } = body;
      console.log(`from find email repo ${email}`);
      const user = await this.userModel.findOne({ email });
      return user;
    } catch (e) {
      console.log('from find user email repo', e);
      throw new BadRequestException('Email already registered');
    }
  }

  async findUser(body: createUserDto): Promise<User> {
    try {
      const { email } = body;
      const client = await this.userModel.findOne({ email });
      console.log('from user repo');
      console.log(client);
      return client;
    } catch (e) {
      console.log('from findUser', e);
    }
  }
}
