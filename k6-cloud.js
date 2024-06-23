import http from 'k6/http';
import {sleep} from "k6";

export const options = {
    vus: 10,
    duration: '10s',
    cloud: {
        projectID: 3702402
    }
}

export default function () {
    http.get('https://test.k6.io');
    sleep(1);

    // k6 login cloud (login with username and password)
    // k6 login cloud --token fd046e4c...
    // k6 cloud k6-cloud.js (run test and report to cloud)
    // k6 run k6-cloud.js -o cloud (run test locally and report to the cloud)
}
