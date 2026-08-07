import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { usersProviders } from './providers/users.provider';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './controller/users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...usersProviders, UsersService],
})
export class UsersModule {}
