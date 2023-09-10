import { Request, Response, NextFunction } from 'express';

// middleware to log the base url and the host url of the incoming requests
export function ApplicationLogger(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // log the base url and the host url from the `req` object
  console.log({
    Host: req.host,
    URL: req.url,
  });

  next();
}
