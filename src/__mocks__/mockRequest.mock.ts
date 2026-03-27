import { Request } from 'express';
import { Params } from 'express-serve-static-core';

type MockRequestData = {
    body?: any;
    params?: Params;
    query?: Params;
};

export const makeMockRequest = ({
    body,
    params,
    query
}: MockRequestData = {}): Request => {
    const request = {
        body: body || {},
        params: params || {},
        query: query || {}
    } as unknown;

    return request as Request;
};