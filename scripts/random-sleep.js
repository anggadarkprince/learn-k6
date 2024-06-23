import http from 'k6/http';
import {sleep} from "k6";
import {randomIntBetween} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    vus: 5,
    duration: '10s',
}

export default function () {
    const response = http.post('https://test.k6.io/public/crocodiles');

    console.log('- VU stage -');
    sleep(randomIntBetween(1, 5)); // sleep between 1 and 5 seconds
}

