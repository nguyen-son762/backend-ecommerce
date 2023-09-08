import { HttpStatus } from '@nestjs/common';

export type ErrorMessage = {
  status: HttpStatus;
  error: string;
};
