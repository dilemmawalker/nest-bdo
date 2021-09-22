import { HttpStatus } from '@nestjs/common';

export class ResponseUtils {
  public static success(result?: any, message?: string, meta?: any) {
    const statusCode = HttpStatus.OK;
    return {
      result,
      message,
      meta,
      statusCode,
    };
  }
}
