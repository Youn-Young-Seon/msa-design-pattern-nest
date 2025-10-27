import { Injectable } from "@nestjs/common";
import { Order } from "./domain/order";
import { PaymentService } from "./payment.service";

@Injectable()
export class FakePaymentService extends PaymentService {
    processPayment(order: Order): boolean {
        console.log("[Payment] 주문 " + order.id + " 결제 처리 완료 (가상 성공)");
        return true;
    }

}