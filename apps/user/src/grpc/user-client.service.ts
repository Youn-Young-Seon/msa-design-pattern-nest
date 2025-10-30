import { BadRequestException, Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../domain/user.entity";
import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";
import { UserDto } from "../dto/user.dto";
import { ResponseOrder } from "../vo/response-order";

interface Order extends ResponseOrder {}

interface OrderService {
    getOrders(userId: string): Promise<Order[]>
}

@Injectable()
export class UserClientService implements OnModuleInit {
    private readonly logger = new Logger(UserClientService.name);
    private orderService: OrderService;

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @Inject('ORDER_SERVICE')
        private readonly orderClient: ClientGrpc,
    ) { }

    onModuleInit() {
        this.orderService = this.orderClient.getService<OrderService>('OrderService');
    }

    async getUserByUserId(userId: string) {
        const userEntity = await this.userRepository.findOneBy({ userId });

        if (!userEntity) {
            throw new BadRequestException('User not found');
        }

        this.logger.log('Before call orders microservice');
        const orderListResponse = await this.orderService.getOrders(userId);

        const userDto = plainToClass(UserDto, userEntity);
        userDto.orders = orderListResponse;

        return userDto;
    }
}