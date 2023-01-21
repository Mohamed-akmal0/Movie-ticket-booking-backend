import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TheaterController } from './theater.controller';
import { TheaterService } from './theater.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema, Theater, TheaterSchema } from '@app/common';
import { TheaterRepo } from './theater.repository';
import { Movie } from '@app/common';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('THEATER_SECRET_KEY'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Theater.name, schema: TheaterSchema }]),
    AdminModule,
  ],
  controllers: [TheaterController],
  providers: [TheaterService, TheaterRepo],
})
export class TheaterModule {}
