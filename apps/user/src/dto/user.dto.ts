import { ResponseOrder } from "../vo/response-order";

export class UserDto {
    email: string;
    name: string;
    pwd: string;
    userId: string;
    createdAt: Date;
    encryptedPwd: string;
    decryptedPwd: string;
    orders: ResponseOrder[];
}