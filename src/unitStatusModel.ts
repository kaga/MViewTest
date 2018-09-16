export interface UnitStatusResponse {
    id: string,
	power: number; // 0 for off, 1 for on
	standby: number;
	setmode: HeatPumpStatus;
	automode: number;
	setfan: number;
	settemp: string;
	roomtemp: string;
	airdir: number;
	airdirh: number;
	sendcount: number;
	fault: string;
	error: string;
}

export enum HeatPumpStatus {
    HEAT = 1,
    DRY = 2,
    COOL = 3,
    FAN = 7,
    AUTO = 8
} 

export interface UnitStatus {
    unitId: string;
    isPowerOn: boolean;
    isStandBy: boolean;
    
    currentState: HeatPumpStatus;

    targetTemperatureInC: number;
    currentTemperatureInC: number;
    
    currentFanSpeed: number;
}

export function parseUnitStatusResponse(response: UnitStatusResponse): UnitStatus {
    const STATUS_OK = 'ok'
    if (response.error !== STATUS_OK || response.fault !== '') {
        throw new Error(`Heat pump ${response.id}, fault: ${response.fault}`);
    }

    return {
        unitId: response.id,
        isPowerOn: (response.power === 1),
        isStandBy: (response.standby === 1),
        currentState: response.setmode,
        targetTemperatureInC: parseFloat(response.settemp),
        currentTemperatureInC: parseFloat(response.roomtemp),
        currentFanSpeed: response.setfan
    }
}



