import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';

import { DatabaseModule } from '@app/common';
import { TheaterModule } from './theater/theater.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        MONGO_URI: joi.string().required(),
        PORT: joi.number().required(),
      }),
      envFilePath: '.env',
    }),
    // MongooseModule.forRoot("mongodb://localhost/backend"),

    ClientModule,
    AdminModule,
    DatabaseModule,
    TheaterModule,
  ],
})
export class AppModule {}
