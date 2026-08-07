import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import express from 'express';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../Dto/users.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { LoginGuard } from 'src/common/guards/login.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() CreateUserDto: CreateUserDto) {
    return this.usersService.create(CreateUserDto);
  }

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    return this.usersService.login(credentials.email, credentials.password);
  }

  @UseGuards(LoginGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: express.Response) {
    res.clearCookie('access_token');
    return this.usersService.logout();
  }

  @Get(':id')
  async getProfile(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.getProfile(id);
  }
}
