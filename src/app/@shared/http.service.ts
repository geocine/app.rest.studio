import { DefaultHttpResponse } from '../@model/http/http-response';
import { toAxiosOptions } from '../@utils/request.utils';
import { DefaultHttpRequest } from '../@model/http/http-request';
import { parseResponse, parseResponseError } from '../@utils/response.utils';
import axios from 'axios';
import { ChromeService } from './chrome.service';
import { Injectable } from '@angular/core';

export interface HttpClient {
    execute(request: DefaultHttpRequest): Promise<DefaultHttpResponse>;
}

@Injectable()
export class DefaultHttpClient implements HttpClient {

    constructor(private chromeService: ChromeService) {
        console.info('chromeService', chromeService);
    }

    public execute(request: DefaultHttpRequest): Promise<DefaultHttpResponse> {
        if (this.chromeService.connected) {
            return this.chromeService.sendRequest(request);
        }

        let options = toAxiosOptions(request);
        // TODO: merge environment
        console.debug('axios options', options);
        return new Promise(resolve => {
            axios.request(options)
                .then(resp => {
                    let response = parseResponse(resp);
                    resolve(response);
                })
                .catch(err => {
                    let response = parseResponseError(err);
                    resolve(response);
                });
        });
    }

}
