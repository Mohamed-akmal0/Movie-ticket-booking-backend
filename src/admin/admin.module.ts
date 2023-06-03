import { Theater, TheaterSchema } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/client/Schema/user.schema';
import { AdminController } from './admin.controller';
import { AdminRepo } from './admin.repository';
import { AdminService } from './admin.service';
import { Admin, AdminSchema } from './schema/admin.schema';
import { Movie, MovieSchema } from '@app/common';
import { JwtStrategy } from '@app/common';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('ADMIN_SECRET_KEY'), 
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Theater.name, schema: TheaterSchema },
      { name: Admin.name, schema: AdminSchema },
      { name: Movie.name, schema: MovieSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminRepo, JwtStrategy],
  exports: [AdminRepo],
})
export class AdminModule {}
