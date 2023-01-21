import { AbstractDocument } from '../abstract.schema';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TheaterDocument = Theater & Document;

@Schema({ versionKey: false, collection: 'theater' })
export class Theater extends AbstractDocument {
  @Prop()
  username: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  theaterName: string;
  @Prop()
  location: string;
  @Prop()
  no_of_screens: number;

  @Prop({ type: Boolean, default: false })
  isBlocked: boolean;

  @Prop({ type: Boolean, default: false })
  isDelete: boolean;

  @Prop({ type: Boolean, default: false })
  isApproved: boolean;

  @Prop({
    type: [
      {
        name: { type: String },
        row: { type: Number },
        col: { type: Number },
        showInfo: [
          {
            movieId: { type: String },
            price: { type: Number },
            time: { type: String },
            screenType: { type: String },
          },
        ],
      },
    ],
  })
  screens: {
    name: string;
    row: number;
    col: number;
    showInfo: {
      movieId: string;
      price: number;
      time: string;
      screenType: string;
    }[];
  }[];
}

export const TheaterSchema = SchemaFactory.createForClass(Theater);
