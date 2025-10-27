import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { catchError, map, Observable } from "rxjs";
import { DataSource } from "typeorm";

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
    private readonly logger = new Logger(TransactionInterceptor.name);

    constructor(private readonly datasource: DataSource) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const queryRunner = this.datasource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        this.logger.log('transaction started');

        return next.handle().pipe(
            map(async () => {
                await queryRunner.commitTransaction();
                queryRunner.release();
            }),
            catchError(async (error) => {
                queryRunner.rollbackTransaction();
                queryRunner.release();

                throw error;
            })
        );
    }

}