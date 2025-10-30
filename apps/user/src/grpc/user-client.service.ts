import { BadRequestException, Controller, Get, Inject, Logger, OnModuleInit, UseGuards } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../domain/user.entity";
import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";
import { UserDto } from "../dto/user.dto";
import { ResponseOrder } from "../vo/response-order";
import { UserGuard } from "../guard/user.guard";

interface Order extends ResponseOrder {}

interface OrderMicroService {
    getOrders(userId: string): Promise<Order[]>
}

@Controller()
export class UserClientService implements OnModuleInit {
    private readonly logger = new Logger(UserClientService.name);
    private orderMicroService: OrderMicroService;

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @Inject('ORDER_SERVICE')
        private readonly orderClient: ClientGrpc,
    ) { }

    onModuleInit() {
        this.orderMicroService = this.orderClient.getService<OrderMicroService>('OrderService');
    }

    @Get('users/:userId')
    @UseGuards(UserGuard)
    async getUserByUserId(userId: string) {
        const userEntity = await this.userRepository.findOneBy({ userId });

        if (!userEntity) {
            throw new BadRequestException('User not found');
        }

        this.logger.log('Before call orders microservice');
        const orderListResponse = await this.orderMicroService.getOrders(userId);

        const userDto = plainToClass(UserDto, userEntity);
        userDto.orders = orderListResponse;

        return userDto;
    }
}