import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './domain/user.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';
import { randomUUID } from 'crypto';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) { }

  async createUser(userDto: UserDto) {
    userDto.userId = randomUUID().toString();
    const userEntity = plainToClass(UserEntity, userDto);
    userEntity.encryptedPwd = await bcrypt.hash(userDto.pwd, 10);

    await this.userRepository.save(userEntity);

    return plainToClass(UserDto, userEntity);
  }

  async getUserByUserId(userId: string) {
    const userEntity = await this.userRepository.findOneBy({ userId });

    if (!userEntity) {
      throw new BadRequestException('User not found');
    }

    // this.logger.log('Before call orders microservice');
    // const orderUrl: string = `http://127.0.0.1:1337/${userId}/orders`;
    // const orderListResponse = await firstValueFrom(this.httpService.get(orderUrl));
    // const ordersList = orderListResponse.data.data;

    const userDto = plainToClass(UserDto, userEntity);
    // userDto.orders = ordersList;

    return userDto;
  }

  async getUserByAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getUserDetailsByEmail(email: string) {
    const optionalUserEntity = await this.userRepository.findOneBy({ email });

    if(!optionalUserEntity) {
      throw new BadRequestException(email);
    }

    return plainToClass(UserDto, optionalUserEntity);
  }

  async login(userDto: UserDto) {
    const user = await this.userRepository.findOneBy({ userId: userDto.userId });
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = bcrypt.compare(userDto.pwd, user.encryptedPwd);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user.name, sub: user.id }
    this.logger.log(`payload: ${JSON.stringify(payload)}`)
    
    return this.jwtService.sign(payload);
  }
}
