import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import User from './typeorm/product.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      username: process.env.DB_USERNAME,
      autoLoadEntities: true,
      entities: [User]
    }),
    UsersModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AppController, AuthController, ProductsController],
  providers: [AppService, AuthService, ProductsService],
})
export class AppModule {}
