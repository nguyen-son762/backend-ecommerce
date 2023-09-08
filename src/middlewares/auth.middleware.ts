import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

export interface RequestModel extends Request {
  user: HttpException;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: RequestModel, res: Response, next: NextFunction) {
    try {
      const tokenArray: string[] = req.headers['authorization']?.split(' ');
      const decodedToken = await this.authService.verifyJwt(tokenArray[1]);
      // make sure that the user is not deleted, or that props or rights changed compared to the time when the jwt was issued
      const user = decodedToken?.user;
      if (user) {
        // add the user to our req object, so that we can access it later when we need it
        // if it would be here, we would like overwrite
        req.user = user;
        next();
      } else {
        throw new HttpException(
          {
            message: 'Unauthorized',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (err) {
      throw new HttpException(
        { message: 'Unauthorized' },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
