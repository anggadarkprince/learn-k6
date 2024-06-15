import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    stages: [
        {
            duration: '5s',
            target: 10000, // spike the request in short time
        },
        {
            duration: '5s',
            target: 0, // will ramp down the traffic from 10000 to 0
        },
    ],
}

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}

// A spike test verifies whether the system survives and performs under sudden and massive rushes of utilization.
// Spike tests are useful when the system may experience events with exceptional traffic volumes. Examples of such
// events include ticket sales (Taylor Swift), product launches (PS5).
