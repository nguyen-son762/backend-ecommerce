import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodeEnums } from 'src/constants/http.constants';

export const errorException = (
  status: HttpStatus,
  error = 'Server is error',
  type = ErrorCodeEnums.ERROR,
) => {
  return new HttpException(
    {
      status,
      error: {
        message: error,
        type: type,
      },
    },
    status,
  );
};
