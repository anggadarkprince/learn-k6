import http from 'k6/http';
import {check} from "k6";

export default function () {
    let response = http.get('https://test-api.k6.io/public/crocodiles/');
    const crocodiles = response.json();
    const crocodile = crocodiles.shift();
    response = http.get(`https://test-api.k6.io/public/crocodiles/${crocodile.id}/`);

    console.log(response.headers['Content-Type']);

    check(response, {
        'status is 200': r => r.status === 200,
        [`crocodile is ${crocodile.name}`]: r => r.json().name === crocodile.name,
    });
}
