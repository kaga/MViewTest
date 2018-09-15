import { UnitStatus } from './unitStatusModel'
import { Unit } from './unitApi';

export class MelViewApi {

    constructor(parameters: Parameters) {

    }

    // login() {

    // }

    getRooms(): Promise<Unit[]>  {
        
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


