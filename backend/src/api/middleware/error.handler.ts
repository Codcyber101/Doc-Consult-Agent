import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {
  private readonly amharicMessages = {
    [HttpStatus.NOT_FOUND]: 'ይቅርታ፣ የጠየቁት መረጃ አልተገኘም። (Information not found)',
    [HttpStatus.UNAUTHORIZED]: 'እባክዎ መጀመሪያ ይግቡ። (Please login first)',
    [HttpStatus.INTERNAL_SERVER_ERROR]: 'የቴክኒክ ችግር አጋጥሟል። እባክዎ ቆይተው ይሞክሩ። (Technical issue, please try again later)',
  };

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = this.amharicMessages[status] || 'ያልታወቀ ችግር አጋጥሟል። (Unknown error)';

    response.status(status).json({
      statusCode: status,
      message_am: message,
      timestamp: new Date().toISOString(),
    });
  }
}
