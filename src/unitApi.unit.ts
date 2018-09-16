import { Unit } from './unitApi';
import { HttpRequestHelper, HttpOption } from './httpRequestHelper'; 
import * as assert from 'power-assert';
import * as sinon from 'sinon';

describe('Unit Api', function() {

    let api: Unit;
    let helper: MockHttpRequest;
    let mock: sinon.SinonStub;

    beforeEach(function() {
        helper = new MockHttpRequest();
        mock = sinon.stub(helper, 'post');

        mock.withArgs({
            url: '/api/login.aspx',
            body: {
                user: 'foo',
                pass: 'bar',
                appversion: '3.2.1'
            }
        }).resolves({
            "id": "00001"
        })

        mock.withArgs({
            url: '/api/unitcommand.aspx',
            body: {
                "unitid":"123456",
	            "v": 3
            }
        } as HttpOption).resolves({
            "id": "123456",
            "power": 1,
            "standby": 0,
            "setmode": 7,
            "automode": 0,
            "setfan": 2,
            "settemp": "20",
            "roomtemp": "22",
            "airdir": 1,
            "airdirh": 0,
            "sendcount": 0,
            "fault": "",
            "error": "ok"
        });

        mock.withArgs({
            url: '/api/unitcapabilities.aspx',
            body: {
                "unitid":"123456",
	            "v": 3
            }
        } as HttpOption).resolves({
            "id": "123456",
            "unitname": "Heat pump",
            "unittype": "RAC",
            "userunits": 1,
            "modeltype": 3,
            "adaptortype": "mac559",
            "addons": "",
            "localip": "123.456.789.0",
            "fanstage": 3,
            "hasairdir": 0,
            "hasswing": 0,
            "hasautomode": 1,
            "hascoolonly": 0,
            "hasautofan": 0,
            "hasdrymode": 1,
            "hasoutdoortemp": 0,
            "hasairauto": 1,
            "hasairdirh": 0,
            "max": {
                "3": {
                    "min": 19,
                    "max": 30
                },
                "1": {
                    "min": 17,
                    "max": 28
                },
                "8": {
                    "min": 19,
                    "max": 28
                }
            },
            "time": "00:14 Wed",
            "error": "ok"
        });

        api = new Unit("123456", {
            username: 'foo',
            password: 'bar'
        }, helper);
    });


    it('should get current status', async function() {
        const status = await api.getCurrentUnitStatus();

        assert.equal(status.unitId, "123456");
        assert.equal(status.isPowerOn, true);
        assert.equal(status.isStandBy, false);
        assert.equal(status.currentTemperatureInC, 22);
        assert.equal(status.targetTemperatureInC, 20);
        assert.equal(status.currentFanSpeed, 2);
    });

    it('should renew login when cookie expire', async function() {
        const status1 = await api.getCurrentUnitStatus();
        const status2 = await api.getCurrentUnitStatus();
    })
});

class MockHttpRequest implements HttpRequestHelper {
    post(option: HttpOption) {
        return Promise.resolve()        
    }
}
