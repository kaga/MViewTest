import * as superagent from 'superagent';

export interface HttpRequestHelper {
    post(option: HttpOption) : Promise<any>
}

export interface HttpOption {
    url: string,
    body: any
}

export class SuperagentHelper implements HttpRequestHelper {
    post(option: HttpOption) {
        const request = superagent.post(option.url);
        return request.then((response) => {
            return response.body;
        });
    }
}