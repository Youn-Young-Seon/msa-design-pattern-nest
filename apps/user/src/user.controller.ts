import { Body, Controller, Get, HttpStatus, Inject, Logger, OnModuleInit, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RequestUser } from './vo/request-user';
import { plainToClass } from 'class-transformer';
import { ResponseUser } from './vo/response-user';
import { UserDto } from './dto/user.dto';
import { UserGuard } from './guard/user.guard';
import { ClientGrpc } from '@nestjs/microservices';
import { OrderMicroservice } from '@app/common/grpc/proto';
import { ORDER_SERVICE_NAME } from '@app/common/grpc/proto/order';
import { ResponseOrder } from './vo/response-order';
import { lastValueFrom } from 'rxjs';

@Controller()
export class UserController implements OnModuleInit {
  private readonly logger = new Logger(UserController.name);
  private userMicroService: OrderMicroservice.OrderServiceClient;

  constructor(
    private readonly userService: UserService,
    @Inject(ORDER_SERVICE_NAME)
    private readonly orderClient: ClientGrpc,
  ) { }

  onModuleInit() {
    this.userMicroService = this.orderClient.getService<OrderMicroservice.OrderServiceClient>('OrderService');
  }

  @Post('users')
  async createUser(@Body() user: RequestUser) {
    const userDto = plainToClass(UserDto, user);
    await this.userService.createUser(userDto);

    const responseUser = plainToClass(ResponseUser, userDto);
    return {
      code: HttpStatus.CREATED,
      data: responseUser
    }
  }

  @Get('users')
  @UseGuards(UserGuard)
  async getUsers() {
    const userList = await this.userService.getUserByAll();
    const result = userList.map(user => plainToClass(ResponseUser, user));

    return {
      code: HttpStatus.OK,
      data: result
    }
  }

  @Get('users/:userId')
  @UseGuards(UserGuard)
  async getUser(@Param('userId') userId: string) {
    
    const userDto = await this.userService.getUserByUserId(userId);
    const orderResponse = this.userMicroService.getOrders({ userId });
    const orders = (await lastValueFrom(orderResponse)).orders;
    this.logger.log(`orders: ${JSON.stringify(orders)}`);
    userDto.orders = plainToClass(ResponseOrder, orders);

    if (!userDto) {
      return {
        code: HttpStatus.NOT_FOUND,
        message: 'User not found',
        data: null
      }
    }

    const returnValue = plainToClass(ResponseUser, userDto);

    return {
      code: HttpStatus.OK,
      data: returnValue
    }
  }

  @Post('login')
  async login(@Body() requestUser: RequestUser) {
    const userDto = plainToClass(UserDto, requestUser);
    return await this.userService.login(userDto);
  }

}
