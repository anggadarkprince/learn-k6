import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    stages: [
        {
            duration: '5s',
            target: 1000, // will ramp up the traffic from 1 to 100 (use higher number than load-test, test with gradually increased number)
        },
        {
            duration: '30s',
            target: 1000, // keep the 1000 vus traffic
        },
        {
            duration: '5s',
            target: 0, // will ramp down the traffic from 1000 to 0
        },
    ],
}

export default function () {
    http.get('https://test.k6.io', 'Hello world!');
    sleep(1);
    http.get('https://test.k6.io/contact.php');
    sleep(2);
    http.get('https://test.k6.io/news.php');
    sleep(2);
}

// Stress tests help you discover how the system functions with the load at peak traffic.
// Stress testing might also be called rush-hour testing, surge testing, or scale testing.
// See the What is stress testing in load testing? section to learn more.
