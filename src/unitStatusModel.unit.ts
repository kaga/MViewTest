import { parseUnitStatusResponse, HeatPumpStatus } from './unitStatusModel';
import * as assert from 'power-assert';

describe('Unit Status Model', function() {
    it('should parse vaild status', function() {
        const response = parseUnitStatusResponse({
            "id": "12345",
            "power": 1,
            "standby": 0,
            "setmode": 1,
            "automode": 0,
            "setfan": 3,
            "settemp": "20",
            "roomtemp": "22",
            "airdir": 5,
            "airdirh": 0,
            "sendcount": 0,
            "fault": "",
            "error": "ok"
        });
        assert.equal(response.isPowerOn, true);
        assert.equal(response.isStandBy, false);
        assert.equal(response.currentState, HeatPumpStatus.HEAT);
        assert.equal(response.targetTemperatureInC, 20);
        assert.equal(response.currentTemperatureInC, 22);
        assert.equal(response.currentFanSpeed, 3);
    });

    it('should throw heat pump fault error', function() {
        try {
            const response = parseUnitStatusResponse({
                "id": "12345",
                "power": 1,
                "standby": 0,
                "setmode": 1,
                "automode": 0,
                "setfan": 3,
                "settemp": "20",
                "roomtemp": "22",
                "airdir": 5,
                "airdirh": 0,
                "sendcount": 0,
                "fault": "fault testing",
                "error": "error"
            });
            assert.fail("should not return a response")
        } catch (exception) {
            assert.ok(exception);
        }
    });
});
