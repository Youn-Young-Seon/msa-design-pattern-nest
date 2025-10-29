import { Injectable, NestMiddleware } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class BearerTokenMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        const token = this.getRawToken(req);

        if (!token) {
            next();
            return;
        }

        const rawToken = this.verifyToken(token);

        req.user = rawToken;

        next();
    }

    private getRawToken(req: any) {
        return req.headers['authorization'];
    }

    private verifyToken(token: string) {
        const rawToken = token.startsWith('Bearer ') ? token.slice(7) : token;

        return jwt.verifyToken(rawToken, process.env.TOKEN_SECRET);
    }
}