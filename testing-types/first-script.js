import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    vus: 10,
    duration: '10s' // the 10 vus will try hit the function as much as possible for 10 seconds (hit again and again after get the response)
}

export default function() {
    http.get('https://test.k6.io');
    sleep(1);
}

// k6 run first-script.js
// K6_WEB_DASHBOARD=true k6 run first-script.js  then open: http://127.0.0.1:5665
// k6 run --out json=test_results.json first-script.js (realtime output: https://k6.io/docs/results-output/real-time)

// 1. smoke test: verify the system functions with minimal load.
// 2. average-load test: assess how the system performs under a typical load for your application.
// 3. stress test: discover how the system functions with the load at peak traffic.
// 4. spike test: verifies whether the system survives and performs under sudden and massive traffic.
// 5. breakpoint test: discover your system’s limits by running gradually load and see when system start failure.
// 6. soak test: variation of the average-load test, might call endurance test (run average-load in long time).
