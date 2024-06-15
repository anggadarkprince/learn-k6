import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    stages: [
        {
            duration: '5m',
            target: 100, // will ramp up the traffic from 1 to 100 (the number should same as load test)
        },
        {
            duration: '8h',
            target: 100, // keep the 100 vus traffic in long duration
        },
        {
            duration: '5s',
            target: 0, // will ramp down the traffic from 100 to 0
        },
    ],
}

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
    http.get('https://test.k6.io/contact.php');
    sleep(2);
    http.get('https://test.k6.io/news.php');
    sleep(2);
}

// Soak tests are a variation of the average-load test. The main difference is the test duration.
// In a soak test, the peak load is usually an average load, but the peak load duration extends
// several hours or even days. Though the duration is considerably longer, the ramp-up and ramp-down
// periods of a soak test are the same as an average-load test.
//
// A soak test might also be called an endurance, constant high load, or stamina test.
