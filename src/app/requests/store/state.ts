import { DefaultHttpRequest } from '../../@model/http/http-request';
import { DefaultHttpResponse } from '../../@model/http/http-response';

export interface IRequestsState {
    requests: DefaultHttpRequest[];
    // pages: any[];
    // entities: any[];
    // collections: any[];
    responses: { [id: string]: DefaultHttpResponse };

    activeRequestId?: string;
    // activePageId: string;
    // activeEntityId: string;
    // activeCollectionId: string;

    // loading status
    loadingRequests?: boolean;
    savingRequest?: boolean;
}

export const RequestsInitialState: IRequestsState = {
    requests: [],
    responses: {},

    activeRequestId: null,

    loadingRequests: false,
    savingRequest: false,
};
