import { AbstractDocument } from '../abstract.schema';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type ScreenDocument = Screen & Document;

@Schema({ versionKey: false, collection: 'screens' })
export class Screen extends AbstractDocument {
  @Prop()
  theaterId: ObjectId;
  @Prop()
  name: string;
  @Prop()
  cols: number;
  @Prop()
  rows: number;
  @Prop({ default: null })
  movieId: ObjectId;
  @Prop()
  price: number;
  @Prop({ type: String, default: null })
  screenType: string;
  @Prop({ type: String, default: null })
  time: string;
}

export const ScreenSchema = SchemaFactory.createForClass(Screen);
