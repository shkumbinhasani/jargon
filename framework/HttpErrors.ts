export class HttpError extends Error {
    readonly status: number;
    readonly message: string;
    readonly data?: any;

    constructor(status: number, message: string, data?: any) {
        super(message);
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

export class BadRequestError extends HttpError {
    constructor(message: string = "Bad Request", data?: any) {
        super(400, message, data);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message: string = "Unauthorized", data?: any) {
        super(401, message, data);
    }
}

export class PaymentRequiredError extends HttpError {
    constructor(message: string = "Payment Required", data?: any) {
        super(402, message, data);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message: string = "Forbidden", data?: any) {
        super(403, message, data);
    }
}

export class NotFoundError extends HttpError {
    constructor(message: string = "Not Found", data?: any) {
        super(404, message, data);
    }
}

export class MethodNotAllowedError extends HttpError {
    constructor(message: string = "Method Not Allowed", data?: any) {
        super(405, message, data);
    }
}

export class NotAcceptableError extends HttpError {
    constructor(message: string = "Not Acceptable", data?: any) {
        super(406, message, data);
    }
}

export class ProxyAuthenticationRequiredError extends HttpError {
    constructor(message: string = "Proxy Authentication Required", data?: any) {
        super(407, message, data);
    }
}

export class RequestTimeoutError extends HttpError {
    constructor(message: string = "Request Timeout", data?: any) {
        super(408, message, data);
    }
}

export class ConflictError extends HttpError {
    constructor(message: string = "Conflict", data?: any) {
        super(409, message, data);
    }
}

export class GoneError extends HttpError {
    constructor(message: string = "Gone", data?: any) {
        super(410, message, data);
    }
}

export class LengthRequiredError extends HttpError {
    constructor(message: string = "Length Required", data?: any) {
        super(411, message, data);
    }
}

export class PreconditionFailedError extends HttpError {
    constructor(message: string = "Precondition Failed", data?: any) {
        super(412, message, data);
    }
}

export class PayloadTooLargeError extends HttpError {
    constructor(message: string = "Payload Too Large", data?: any) {
        super(413, message, data);
    }
}

export class URITooLongError extends HttpError {
    constructor(message: string = "URI Too Long", data?: any) {
        super(414, message, data);
    }
}

export class UnsupportedMediaTypeError extends HttpError {
    constructor(message: string = "Unsupported Media Type", data?: any) {
        super(415, message, data);
    }
}

export class RangeNotSatisfiableError extends HttpError {
    constructor(message: string = "Range Not Satisfiable", data?: any) {
        super(416, message, data);
    }
}

export class ExpectationFailedError extends HttpError {
    constructor(message: string = "Expectation Failed", data?: any) {
        super(417, message, data);
    }
}

export class ImATeapotError extends HttpError {
    constructor(message: string = "I'm a teapot", data?: any) {
        super(418, message, data);
    }
}

export class MisdirectedRequestError extends HttpError {
    constructor(message: string = "Misdirected Request", data?: any) {
        super(421, message, data);
    }
}

export class UnprocessableEntityError extends HttpError {
    constructor(message: string = "Unprocessable Entity", data?: any) {
        super(422, message, data);
    }
}

export class LockedError extends HttpError {
    constructor(message: string = "Locked", data?: any) {
        super(423, message, data);
    }
}

export class FailedDependencyError extends HttpError {
    constructor(message: string = "Failed Dependency", data?: any) {
        super(424, message, data);
    }
}

export class TooEarlyError extends HttpError {
    constructor(message: string = "Too Early", data?: any) {
        super(425, message, data);
    }
}

export class UpgradeRequiredError extends HttpError {
    constructor(message: string = "Upgrade Required", data?: any) {
        super(426, message, data);
    }
}

export class PreconditionRequiredError extends HttpError {
    constructor(message: string = "Precondition Required", data?: any) {
        super(428, message, data);
    }
}

export class TooManyRequestsError extends HttpError {
    constructor(message: string = "Too Many Requests", data?: any) {
        super(429, message, data);
    }
}

export class RequestHeaderFieldsTooLargeError extends HttpError {
    constructor(message: string = "Request Header Fields Too Large", data?: any) {
        super(431, message, data);
    }
}

export class UnavailableForLegalReasonsError extends HttpError {
    constructor(message: string = "Unavailable For Legal Reasons", data?: any) {
        super(451, message, data);
    }
}

export class InternalServerError extends HttpError {
    constructor(message: string = "Internal Server Error", data?: any) {
        super(500, message, data);
    }
}

export class NotImplementedError extends HttpError {
    constructor(message: string = "Not Implemented", data?: any) {
        super(501, message, data);
    }
}

export class BadGatewayError extends HttpError {
    constructor(message: string = "Bad Gateway", data?: any) {
        super(502, message, data);
    }
}

export class ServiceUnavailableError extends HttpError {
    constructor(message: string = "Service Unavailable", data?: any) {
        super(503, message, data);
    }
}

export class GatewayTimeoutError extends HttpError {
    constructor(message: string = "Gateway Timeout", data?: any) {
        super(504, message, data);
    }
}

export class HTTPVersionNotSupportedError extends HttpError {
    constructor(message: string = "HTTP Version Not Supported", data?: any) {
        super(505, message, data);
    }
}

export class VariantAlsoNegotiatesError extends HttpError {
    constructor(message: string = "Variant Also Negotiates", data?: any) {
        super(506, message, data);
    }
}

export class InsufficientStorageError extends HttpError {
    constructor(message: string = "Insufficient Storage", data?: any) {
        super(507, message, data);
    }
}

export class LoopDetectedError extends HttpError {
    constructor(message: string = "Loop Detected", data?: any) {
        super(508, message, data);
    }
}

export class NotExtendedError extends HttpError {
    constructor(message: string = "Not Extended", data?: any) {
        super(510, message, data);
    }
}

export class NetworkAuthenticationRequiredError extends HttpError {
    constructor(message: string = "Network Authentication Required", data?: any) {
        super(511, message, data);
    }
}
