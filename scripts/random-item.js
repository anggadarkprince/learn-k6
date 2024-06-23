import http from 'k6/http';
import {randomItem} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    vus: 5,
    duration: '10s',
}

export default function () {
    const resCrocodiles = http.get('https://test-api.k6.io/public/crocodiles/');
    const crocodiles = resCrocodiles.json();
    const crocodileId = randomItem(crocodiles).id;
    console.log('Crocodile ID', crocodileId);
    const response = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);
    console.log('Response', response.json());
}

