import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    stages: [
        {
            duration: '2h',
            target: 10000, // gradually increase the request in long time
        },
    ],
}

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}

// Breakpoint tests discover your system’s limits.
// Breakpoint testing is also known as capacity, point load, and limit testing.
// It’s not only about knowing at what point your system will fail.
// It’s also a test to help determine where and how a system starts to fail and helps teams prepare for such limits.

// A breakpoint test ramps to unrealistically high numbers. This test commonly has to be stopped manually
// or automatically as thresholds start to fail. When these problems appear, the system has reached its limits.
