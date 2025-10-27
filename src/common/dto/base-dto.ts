export class BaseDto<T> {
    private readonly timestamp: Date;
    private readonly success: boolean;
    private readonly message: string;
    private readonly data?: T;

    constructor(success: boolean, message: string, data?: T) {
        this.timestamp = new Date(Date.now());
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static success<T>(data: T): BaseDto<T>;
    static success<T>(message: string, data: T): BaseDto<T>;
    static success<T>(param1: T | string, param2?: T): BaseDto<T> {
        if (typeof param1 === 'string') {
            return new BaseDto<T>(true, param1, param2);
        } else {
            return new BaseDto<T>(true, 'success', param1);
        }
    }

    static fail<T>(message: string): BaseDto<T> {
        return new BaseDto<T>(false, message);
    }
}