import { UnitStatus, parseUnitStatusResponse, UnitStatusResponse } from './unitStatusModel';
import { HttpRequestHelper } from './httpRequestHelper';
import * as moment from 'moment';
import { login, LoginResponse, LoginParameter } from './loginApi';
import { API_VERSION } from './constant';

export class Unit {

	private loginSession?: LoginResponse = undefined;

	constructor(private unitId: string, 
		private loginParameter: LoginParameter,
		private requestHelper: HttpRequestHelper) {
    }

    // getUnitCapabilities() {

    // }

    getCurrentUnitStatus() : Promise<UnitStatus> {
		return Promise.resolve()
			.then(() => {
				if (!this.loginSession || moment(this.loginSession.cookie.expires).isAfter(moment()) == false) {
					return login(this.requestHelper, this.loginParameter)
						.then((loginSession) => {
							this.loginSession = loginSession;
							return loginSession
						})
				} else {
					return this.loginSession
				}
			})
			.then(() => {
				return this.requestHelper.post({
					url: '/api/unitcommand.aspx',
					body: {
						"unitid": this.unitId,
						"v": API_VERSION
					}
				})
					.then((response: UnitStatusResponse) => {
						return parseUnitStatusResponse(response)
					});
			}) 
	}
	
	setNeedLogin() {
		this.loginSession = undefined;
	}
}

// interface UnitCapabilities {
//     unitId: string;
//     unitName: string;
//     localIp: string;
//     fanStage: number;
//     hasAirDir: boolean;
//     hasSwing: boolean;
//     hasAutoMode: boolean;
//     hasCoolOnly: boolean;
//     hasAutoFan: boolean;
//     hasDryMode: boolean;
//     hasOutdoorTemperatureSensor: boolean;
// }

// interface UnitCapabilitiesResponse {
//     id: string;
// 	unitname: string;
// 	unittype: string;
// 	userunits: number;
// 	modeltype: number; 
// 	adaptortype: string; //wifi adapter
// 	addons: string;
// 	localip: string;
// 	fanstage: number;
// 	hasairdir: boolean;
// 	hasswing: boolean;
// 	hasautomode: boolean;
// 	hascoolonly: boolean;
// 	hasautofan: boolean;
// 	hasdrymode: boolean;
// 	hasoutdoortemp: boolean;
// 	hasairauto: boolean;
// 	hasairdirh: boolean;
// 	max: any;
// 	time: string;
// 	error: string;
// }
