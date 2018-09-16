import { constant } from "./constant";
import { HttpRequestHelper } from "./httpRequestHelper";

export function login(requestHelper: HttpRequestHelper, parameter: LoginParameter) : Promise<LoginResponse> {
    return requestHelper.post({
        url: '/api/login.aspx',
        body: {
            user: parameter.username,
            pass: parameter.password,
            appversion: constant.appVersion
        }
    })
        .then((response) => {
            return {
                cookie: {
                    auth: "123",
                    domain: "/",
                    expires: new Date()
                }
            } as LoginResponse
        });
}

export interface LoginParameter {
    username: string,
    password: string
}

export interface LoginResponse {
    cookie: {
        auth: string,
        domain: string,
        expires: Date
    }
}

