import http from 'k6/http';

export default function () {
    // k6 run -e BASE_URL=https://test.k6.io env-vars.js
    const baseUrl = __ENV.BASE_URL || 'https://test-api.k6.io';
    const path = __ENV.PATH || 'public/crocodiles/';
    const url = `${baseUrl}/${path}`;
    const response = http.get(url);
    console.log(response.json());
}
