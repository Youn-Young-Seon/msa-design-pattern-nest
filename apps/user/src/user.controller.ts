import { Body, Controller, Inject, Logger, OnModuleInit, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { RequestUser } from './vo/request-user';
import { plainToClass } from 'class-transformer';
import { ResponseUser } from './vo/response-user';
import { UserDto } from './dto/user.dto';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { OrderMicroservice } from '@app/common/grpc/proto';
import { ORDER_SERVICE_NAME } from '@app/common/grpc/proto/order';
import { ResponseOrder } from './vo/response-order';
import { lastValueFrom } from 'rxjs';
import { GetUserRequest } from '@app/common/grpc/proto/user';

@Controller()
export class UserController implements OnModuleInit {
  private readonly logger = new Logger(UserController.name);
  private orderMicroService: OrderMicroservice.OrderServiceClient;

  constructor(
    private readonly userService: UserService,
    @Inject(ORDER_SERVICE_NAME)
    private readonly orderClient: ClientGrpc,
  ) { }

  onModuleInit() {
    this.orderMicroService = this.orderClient.getService<OrderMicroservice.OrderServiceClient>('OrderService');
  }

  // @Post('users')
  @GrpcMethod('UserService', 'CreateUser')
  async createUser(@Body() user: RequestUser) {
    const userDto = plainToClass(UserDto, user);
    await this.userService.createUser(userDto);

    const responseUser: ResponseUser = plainToClass(ResponseUser, userDto);
    return {
      data: responseUser
    }
  }

  // @Get('users')
  // @UseGuards(UserGuard)
  @GrpcMethod('UserService', 'GetUsers')
  async getUsers(request: GetUserRequest) {
    const userList = await this.userService.getUserByAll();
    const result = userList.map(user => plainToClass(ResponseUser, user));

    return {
      data: result
    }
  }

  @GrpcMethod('UserService', 'GetUser')
  async getUser(request: GetUserRequest) {
    const userDto = await this.userService.getUserByUserId(request.userId);
    this.logger.log(`userDto: ${JSON.stringify(userDto)}`);
    const orderResponse = this.orderMicroService.getOrders({ userId: request.userId });
    this.logger.log(`orderResponse: ${JSON.stringify(orderResponse)}`);
    const orders = (await lastValueFrom(orderResponse)).orders;
    this.logger.log(`orders: ${JSON.stringify(orders)}`);
    userDto.orders = plainToClass(ResponseOrder, orders);

    if (!userDto) {
      return {
        data: null
      }
    }

    const returnValue = plainToClass(ResponseUser, userDto);

    return {
      email: returnValue.email,
      name: returnValue.name,
      userId: returnValue.userId,
      orders: returnValue.orders
    }
  }

  @GrpcMethod('UserService', 'Login')
  async login(requestUser: GetUserRequest) {
    this.logger.log(`requestUser: ${JSON.stringify(requestUser)}`);
    const userDto = plainToClass(UserDto, requestUser);
    const result = await this.userService.login(userDto)
    return {
      token: result
    };
  }
}
