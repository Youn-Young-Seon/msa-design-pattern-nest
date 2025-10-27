import { Order } from "./domain/order";

export abstract class PaymentService {
    abstract processPayment(order: Order): boolean;
}