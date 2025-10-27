import { HttpException, HttpStatus } from "@nestjs/common";

export class BusinessException extends HttpException {
    constructor(message: string, status: number = HttpStatus.BAD_REQUEST) {
        super(message, status);
    }

    static notFound(message: string): BusinessException {
        return new BusinessException(message, HttpStatus.NOT_FOUND);
    }
    
    static badRequest(message: string): BusinessException {
        return new BusinessException(message, HttpStatus.BAD_REQUEST);
    }
}