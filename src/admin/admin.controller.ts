import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { AdminService } from './admin.service';
import { createAdminDto } from './dto/create-admin.dto';
import { diskStorage } from 'multer';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  register(@Body() body: createAdminDto) {
    return this.adminService.register(body);
  }

  @HttpCode(200)
  @Post('login')
  signIn(
    @Body() body: createAdminDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log(body);
    return this.adminService.login(body, response);
  }

  @UseGuards(AuthGuard('admin_jwt'))
  @Get('clients')
  Clients() {
    return this.adminService.clients();
  }
  @Get('notification/theater')
  theater() {
    return this.adminService.theater();
  }
  @Get('approved-theater')
  ApprovedTheater() {
    return this.adminService.get();
  }
  @Patch('approve/:id')
  ApproveTheater(@Param() id: string) {
    return this.adminService.approve(id);
  }
  @Patch('reject/:id')
  rejectTheater(@Param() id: string) {
    return this.adminService.reject(id);
  }
  @Patch('block/:id')
  block(@Param() id: string) {
    console.log(id);
    return this.adminService.blockTheater(id);
  }
  @Patch('unBlock/:id')
  unBlock(@Param() id: string) {
    return this.adminService.unBlockTheater(id);
  }
  @Post('movieInfo')
  async movie(@Body() body: any) {
    return this.adminService.addMovie(body);
  }
  @Post('movieImage/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          console.log(req.params.id);
          //@ts-ignore
          req.imageName = `${req.params.id}.jpg`;
          //@ts-ignore
          cb(null, req.imageName);
        },
      }),
    }),
  )
  addMovieImage(@UploadedFile() image: any) {
    console.log(image);
    return { message: 'success' };
  }
  @Get('getMovies')
  getMovie() {
    return this.adminService.getMovies();
  }
}
