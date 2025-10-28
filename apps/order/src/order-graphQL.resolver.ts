import { Args, Query, Resolver } from "@nestjs/graphql";
import { OrderService } from "./order.service";
import { Order } from "./domain/order";

@Resolver(() => Order)
export class OrderGraphQLResolver {
    constructor(private readonly orderService: OrderService) {}

    @Query(() => [Order])
    async ordersByUser(@Args('userId') userId: string) {
        const orders = await this.orderService.getOrdersByUserId(userId);
        const result = orders.map(order => order.toResponse());
        return result;    
    }
}