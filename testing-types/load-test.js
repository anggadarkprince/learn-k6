import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    stages: [
        {
            duration: '5s',
            target: 100, // will ramp up the traffic from 1 to 100
        },
        {
            duration: '30s',
            target: 100, // keep the 100 vus traffic
        },
        {
            duration: '5s',
            target: 0, // will ramp down the traffic from 100 to 0
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

// Average-load tests assess how the system performs under a typical load for your system or application.
// Typical load might be a regular day in production or an average timeframe in your daily traffic.
// This test also might be called a day-in-life test or volume test.

// Average-load tests simulate the number of concurrent users and requests per second that reflect average
// behaviors in the production environment. This type of test typically increases the throughput or VUs gradually
// and maintains that average load for some time. Depending on the system’s characteristics, the test may stop
// suddenly or have a short ramp-down period.
