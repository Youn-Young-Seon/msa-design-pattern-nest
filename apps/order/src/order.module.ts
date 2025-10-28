import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { Order } from './domain/order';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { OrderGraphQLResolver } from './order-graphQL.resolver';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'qhdks00!!',
      database: 'design',
      entities: [Order],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Order
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/order/src/schema.gql'),
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderGraphQLResolver],
})
export class OrderModule {}
