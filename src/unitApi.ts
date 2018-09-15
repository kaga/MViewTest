
export class Unit {
    constructor() {

    }

    getUnitCapabilities() {

    }

    // getCurrentUnitStatus() : Promise<UnitStatus> {
		
    // }
}

interface UnitCapabilities {
    unitId: string;
    unitName: string;
    localIp: string;
    fanStage: number;
    hasAirDir: boolean;
    hasSwing: boolean;
    hasAutoMode: boolean;
    hasCoolOnly: boolean;
    hasAutoFan: boolean;
    hasDryMode: boolean;
    hasOutdoorTemperatureSensor: boolean;
}

interface UnitCapabilitiesResponse {
    id: string;
	unitname: string;
	unittype: string;
	userunits: number;
	modeltype: number; 
	adaptortype: string; //wifi adapter
	addons: string;
	localip: string;
	fanstage: number;
	hasairdir: boolean;
	hasswing: boolean;
	hasautomode: boolean;
	hascoolonly: boolean;
	hasautofan: boolean;
	hasdrymode: boolean;
	hasoutdoortemp: boolean;
	hasairauto: boolean;
	hasairdirh: boolean;
	max: any;
	time: string;
	error: string;
}
