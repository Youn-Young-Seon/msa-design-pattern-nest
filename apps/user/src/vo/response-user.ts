import { ResponseOrder } from "./response-order";

export class ResponseUser {
    email: string;
    name: string;
    userId: string;
    orders: ResponseOrder[];
}