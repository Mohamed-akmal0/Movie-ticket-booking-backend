import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema({ versionKey: false, collection: 'movies' })
export class Movie extends AbstractDocument {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  genre: string;
  @Prop()
  director: string;
  @Prop()
  date: string;
  @Prop()
  duration: string;
  @Prop()
  link: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
