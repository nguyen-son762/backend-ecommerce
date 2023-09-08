import { HttpException, HttpStatus } from '@nestjs/common';

export const errorException = (status: HttpStatus, error: string) => {
  return new HttpException(
    {
      status,
      error,
    },
    status,
  );
};
