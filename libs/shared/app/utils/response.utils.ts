import { HttpStatus } from "@nestjs/common";

class ResponseUtils {
    public success(result?: any, message?: string, meta?: any) {
        const statusCode = HttpStatus.OK;
        return {
            message,
            result,
            meta,
            statusCode
        };
    }
}

export default new ResponseUtils();
