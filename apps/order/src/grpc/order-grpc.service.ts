import { Controller } from "@nestjs/common";
import { OrderEntity } from "../domain/order.entity";
import { GrpcMethod } from "@nestjs/microservices";
import { OrderService } from "../order.service";

@Controller()
export class OrderGrpcService {
    constructor(
        private readonly orderService: OrderService
    ) { }

    @GrpcMethod('OrderService', 'GetOrders')
    async getOrders(userId: string): Promise<OrderEntity[]> {
        return await this.orderService.getOrdersByUserId(userId);
    }
}