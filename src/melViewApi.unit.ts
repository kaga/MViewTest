import { MelViewApi } from './melViewApi';
import { HttpRequestHelper, HttpOption } from './httpRequestHelper'; 
import * as assert from 'power-assert';
import * as sinon from 'sinon';

describe('MelViewApi', function() {

    let api: MelViewApi;
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

        api = new MelViewApi({
            username: 'foo',
            password: 'bar',
            requestHelper: helper
        });
    });

    it('should login automatically on get unit by id', async function() {
        sinon.assert.notCalled(mock);
        const unit = await api.getUnit("123456");
        
        sinon.assert.calledWith(mock, {
            url: '/api/login.aspx',
            body: {
                user: 'foo',
                pass: 'bar',
                appversion: '3.2.1'
            }
        } as HttpOption);
    });
});

class MockHttpRequest implements HttpRequestHelper {
    post(option: HttpOption) {
        return Promise.resolve()        
    }
}
