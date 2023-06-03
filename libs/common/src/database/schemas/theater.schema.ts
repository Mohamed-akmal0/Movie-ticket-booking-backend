import { AbstractDocument } from '../abstract.schema';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

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
        screenType: { type: String  },
        price: { type: Number  },
        movieId: { type: String  },
        time: { type: String  },
      },
    ],
  })
  screens: {
    name: string;
    row: number;
    col: number;
    screenType: string;
    price: number;
    movieId: ObjectId;
    time: string;
  }[];
}

export const TheaterSchema = SchemaFactory.createForClass(Theater);
