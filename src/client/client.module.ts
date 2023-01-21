import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { User, UserSchema } from './Schema/user.schema';
import { UserRepo } from './user.repository';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('CLIENT_SECRET_KET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ClientController],
  providers: [ClientService, UserRepo],
})
export class ClientModule {}
