import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema({ versionKey: false, collection: 'users' })
export class User extends AbstractDocument {
  @Prop()
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  // isBooked: false;
}

export const UserSchema = SchemaFactory.createForClass(User);
