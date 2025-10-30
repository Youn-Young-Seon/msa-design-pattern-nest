import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './domain/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { BearerTokenMiddleware } from './middleware/bearer-token.middleware';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserClientService } from './grpc/user-client.service';

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
    ClientsModule.register({
      clients: [
        {
          name: 'ORDER_SERVICE',
          transport: Transport.GRPC,
          options: {
            package: 'order',
            protoPath: join(process.cwd(), 'apps', 'proto', 'order.proto'),
          }
        }
      ],
      isGlobal: true
    })
  ],
  controllers: [
    UserController,
    UserClientService
  ],
  providers: [
    UserService
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BearerTokenMiddleware)
      .forRoutes('*');
  }
}