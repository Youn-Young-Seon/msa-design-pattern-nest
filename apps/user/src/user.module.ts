import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './domain/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ORDER_SERVICE_NAME } from '@app/common/grpc/proto/order';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', 'apps/user/.env']
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'qhdks00!!',
      database: 'msa_user',
      entities: [UserEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    HttpModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('TOKEN_SECRET'),
      })
    }),
    ClientsModule.register([
      {
        name: ORDER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: 'order',
          protoPath: join(process.cwd(), 'proto', 'order.proto'),
          url: '127.0.0.1:1337',
        }
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }