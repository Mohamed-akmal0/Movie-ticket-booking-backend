import { Schema } from '@nestjs/mongoose';
// import { SchemaTypes, Types } from 'mongoose';
import mongoose from 'mongoose';

@Schema()
export class AbstractDocument {
  _id: mongoose.Types.ObjectId;
}
