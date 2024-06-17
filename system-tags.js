import http from 'k6/http';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{status:200}': ['p(95)<1000'], // tag only status 200
        'http_req_duration{status:201}': ['p(95)<1000'], // tag only status 201
    }
}

export default function () {
    http.get('https://run.mocky.io/v3/bf936b4b-c62b-42c8-a41d-521704287872'); // api should return 200
    http.get('https://run.mocky.io/v3/5693d50a-b8fa-41dd-ad50-35e7ab929d8f?mocky-delay=2000ms'); // api should return 201
}
