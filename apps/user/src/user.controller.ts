import { Body, Controller, Get, HttpStatus, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RequestUser } from './vo/request-user';
import { plainToClass } from 'class-transformer';
import { ResponseUser } from './vo/response-user';
import { UserDto } from './dto/user.dto';
import { UserGuard } from './guard/user.guard';
import { UserClientService } from './grpc/user-client.service';

@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
  ) { }

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
