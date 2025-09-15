
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmconfigAsync } from './typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { User } from './users/user.entity';
import { UsersModule } from './users/user.module';
import { Data1 } from './users/data.entity';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule, UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Namb@0253',
      database: 'aayurcare',
      entities: [User,Data1],
      autoLoadEntities: true,
      synchronize: true
    }),
    // TypeOrmModule.forRootAsync(typeOrmconfigAsync)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}