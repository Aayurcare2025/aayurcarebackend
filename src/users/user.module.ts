import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import {  UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { Data1 } from './data.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Data1]),
JwtModule.register({
      secret: 'secret', 
      signOptions: { expiresIn: '1h' },
    }),],
  providers: [UsersService],
  controllers:[UserController],
  exports:[UsersService],
})
export class UsersModule {}
