import http from 'k6/http';
import {check, sleep} from 'k6';
import exec from 'k6/execution';

export const options = {
    vus: 100,
    duration: '10s',
    thresholds: {
        //http_req_duration: ['p(95)<100'], // 95% request should bellow 100ms
        http_req_duration: ['max<2000'], // max should bellow 2s
        http_req_failed: ['rate<0.01'], // failed request should bellow 1%
        //http_reqs: ['count>20'],
        http_reqs: ['rate>10'], // should send 100 reqs / seconds
        vus: ['value>9'], // should above 9 all the time
        checks: ['rate>=0.98'] // should above or equal 98%
    }
}

export default function () {
    const res = http.get('https://test.k6.io/' + (exec.scenario.iterationInTest === 1 ? 'foo' : ''));
    console.log(exec.scenario.iterationInTest);

    check(res, {
        'status is 200': (value) => value.status === 200,
        'page is start page': (value) => value.body.includes('Collection of simple web-pages suitable for load testing.'),
    });

    sleep(2);
}
