import { Body, Controller, Get, Inject, Logger, OnModuleInit, Param, Post, UseGuards } from '@nestjs/common';
import { UserMicroservice } from '@app/common/grpc/proto';
import { GetUserRequest, USER_SERVICE_NAME } from '@app/common/grpc/proto/user';
import { ClientGrpc } from '@nestjs/microservices';
import { UserGuard } from '../guard/user.guard';
import { UserService } from './user.service';

@Controller()
export class UserController implements OnModuleInit {
  private readonly logger = new Logger(UserController.name);
  private userMicroService: UserMicroservice.UserServiceClient;

  constructor(
    private readonly userService: UserService,
    @Inject(USER_SERVICE_NAME)
    private readonly userClient: ClientGrpc,
  ) { }

  onModuleInit() {
    this.userMicroService = this.userClient.getService<UserMicroservice.UserServiceClient>('UserService');
  }

  @Get('users/:userId')
  @UseGuards(UserGuard)
  getUser(@Param('userId') userId: string) {
    const userDto = this.userMicroService.getUser({ userId });
    return userDto;
  }

  @Post('login')
  login(@Body() requestUser: GetUserRequest) {
    // const userDto = plainToClass(UserDto, requestUser);
    return this.userMicroService.login(requestUser);
  }
}
