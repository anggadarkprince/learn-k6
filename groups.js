import http from 'k6/http';
import {check, group} from "k6";

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{expected_response:true}': ['p(95)<1000'], // only success response
        'group_duration{group:::Test1}': ['p(95)<8000'], // sum of main request and static
        'group_duration{group:::Test1::Assets}': ['p(95)<3000'], // only static asset
        'group_duration{group:::Test2}': ['p(95)<6000'],
        'group_duration{group:::Main page}': ['p(95)<500'], // group is defined by ::group_name as tag
        'group_duration{group:::Main page::Assets}': ['p(95)<500'],
    }
}

export default function () {
    group('Test1', function() {
        let res = http.get('https://run.mocky.io/v3/bf936b4b-c62b-42c8-a41d-521704287872?mocky-delay=5000ms');
        check(res, {'status is 200': r => r.status === 200});
        group('Assets', function() {
            http.get('https://run.mocky.io/v3/bf936b4b-c62b-42c8-a41d-521704287872?mocky-delay=1000ms');
            http.get('https://run.mocky.io/v3/bf936b4b-c62b-42c8-a41d-521704287872?mocky-delay=1000ms');
        });
    })
    group('Test2', function() {
        let res = http.get('https://run.mocky.io/v3/bf936b4b-c62b-42c8-a41d-521704287872?mocky-delay=5000ms');
        check(res, {'status is 200': r => r.status === 200});
    })
    group('Test3', function() {
        http.get('https://run.mocky.io/v3/32185937-cd79-478f-9872-aacecd22aa7b'); // return 503
    })

    group('Main page', function() {
        let res = http.get('https://test.k6.io');
        check(res, {'status is 200': r => r.status === 200});

        group('Assets', function() {
            http.get('https://test.k6.io/static/css/site.css');
            http.get('https://test.k6.io/static/js/prisms.js');
        });
    });

    group('News page', function() {
        http.get('https://test.k6.io/news.php');
    });
}
