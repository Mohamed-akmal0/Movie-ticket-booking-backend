import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({ versionKey: false, collection: 'main' })
export class Admin extends AbstractDocument {
  @Prop()
  email: string;

  @Prop()
  password: string;
}
export const AdminSchema = SchemaFactory.createForClass(Admin);
