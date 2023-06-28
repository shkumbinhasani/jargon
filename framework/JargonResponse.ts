import {Headers} from "./types";

export class JargonResponse<T> {
    public body: T;
    public status: number;
    public headers: Headers = {};

    constructor(body: T, statusCode: number, headers?: Headers) {
        this.body = body;
        this.status = statusCode;
        this.headers = headers || {};
    }

    static ok<T>(body: T, headers?: Headers): JargonResponse<T> {
        return new JargonResponse(body, 200, headers);
    }

    static created<T>(body: T, headers?: Headers): JargonResponse<T> {
        return new JargonResponse(body, 201, headers);
    }

    static accepted<T>(body: T, headers?: Headers): JargonResponse<T> {
        return new JargonResponse(body, 202, headers);
    }

    static noContent<T>(headers?: Headers): JargonResponse<undefined> {
        return new JargonResponse(undefined, 204, headers);
    }

    static badRequest<T>(body: T, headers?: Headers): JargonResponse<T> {
        return new JargonResponse(body, 400, headers);
    }

    static unauthorized<T>(body: T, headers?: Headers): JargonResponse<T> {
        return new JargonResponse(body, 401, headers);
    }

    addHeader(key: string, value: string): JargonResponse<T> {
        this.headers = {
            ...this.headers,
            [key]: value,
        };
        return this;
    }

    addHeaders(headers: Headers): JargonResponse<T> {
        this.headers = {
            ...this.headers,
            ...headers,
        };
        return this;
    }

    setStatusCode(statusCode: number): JargonResponse<T> {
        this.status = statusCode;
        return this;
    }

    setBody(body: T): JargonResponse<T> {
        this.body = body;
        return this;
    }

    getBody(): T {
        return this.body;
    }

    getStatusCode(): number {
        return this.status;
    }

    getHeaders(): Headers | undefined {
        return this.headers;
    }
}
