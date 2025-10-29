import { Injectable } from "@nestjs/common";

@Injectable()
export class Greeting {
    message: string = process.env.MESSAGE as string;
    ip: string = process.env.MESSAGE as string;
    secret: string = process.env.MESSAGE as string;
}