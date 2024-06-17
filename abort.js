import http from 'k6/http';
import {sleep} from "k6";
import exec from "k6/execution";

export const options = {
    vus: 10,
    duration: '10s',
}

export function setup() {
    const res = http.get('https://test.k6.local/status');
    if (res.error) {
        exec.test.abort('Aborting test. Application is down');
    }
}

export default function () {
    http.get('https://test.k6.local/some-page');
    sleep(1);
    // ctrl + c to abort the test
}
