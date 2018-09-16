import { UnitStatus } from './unitStatusModel'
import { Unit } from './unitApi';
import { HttpRequestHelper, HttpOption, SuperagentHelper } from './httpRequestHelper';
import { constant } from './constant';

export class MelViewApi {

    private requestHelper: HttpRequestHelper;

    constructor(private parameters: Parameters) {
        if (parameters.requestHelper) {
            this.requestHelper = parameters.requestHelper
        } else {
            this.requestHelper = new SuperagentHelper();
        }
    }

    getUnit(unitId: string): Promise<Unit>  {
        return Promise.resolve(new Unit(unitId, this.parameters, this.requestHelper));
    }

    private login() {
        return this.requestHelper.post({
            url: '/api/login.aspx',
            body: {
                user: this.parameters.username,
                pass: this.parameters.password,
                appversion: constant.appVersion
            }
        });
    }

    // getUnitCapabilities(): Promise<void> {
    //     // throw new Exc
    // }

    // getStatus(unitId: String): Promise<UnitStatus> {

    // }
}

export interface Parameters {
    username: string;
    password: string;
    requestHelper?: HttpRequestHelper;
}

interface BuildingResponse {
    buildingid: string;
    building: string;
    bschedule: string;
    units: RoomResponse[];
}

interface RoomResponse {
    room: string;
    unitId: string;
    power: string;
    wifi: string;
    mode: string;
    temp: string;
    settemp: string;
    status: string;
    schedule1: number;
}
