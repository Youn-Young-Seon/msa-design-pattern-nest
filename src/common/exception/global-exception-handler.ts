import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { BusinessException } from "./business-exception";
import { BaseDto } from "../dto/base-dto";
import { Response } from "express";

@Catch()
export class GlobalExceptionHandler implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionHandler.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (exception instanceof BusinessException) {
            this.logger.error(`BusinessException: ${exception.message}`);
            return response
                .status(exception.getStatus())
                .json(BaseDto.fail(exception.message));
        } else if (exception instanceof HttpException) {
            this.logger.error(`HttpException: ${exception.message}`);
            return response
                .status(exception.getStatus())
                .json(BaseDto.fail(exception.message));
        } else {
            this.logger.error(`Internal Server Error: ${exception instanceof Error
                ? exception.message
                : exception
                }
            `);
            return response
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json(BaseDto.fail('Internal Server Error'));
        }
    }
}