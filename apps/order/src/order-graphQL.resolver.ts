import { Args, Query, Resolver } from "@nestjs/graphql";
import { OrderService } from "./order.service";
import { plainToClass } from "class-transformer";
import { ResponseOrder } from "./vo/response-order";
import { OrderEntity } from "./domain/order.entity";

@Resolver(() => OrderEntity)
export class OrderGraphQLResolver {
    constructor(private readonly orderService: OrderService) {}

    @Query(() => [OrderEntity])
    async ordersByUser(@Args('userId') userId: string) {
        const orders = await this.orderService.getOrdersByUserId(userId);
        const result = orders.map(order => plainToClass(ResponseOrder, order));
        return result;    
    }
}