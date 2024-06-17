import http from 'k6/http';
import {check} from 'k6';
import {Counter} from 'k6/metrics';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{page:order}': ['p(95)<1000'], // check metrics by http request tag page:order
        http_error: ['count==0'],
        'http_error{page:order}': ['count==0'], // check custom metric by tag page:order
        checks: ['rate>=0.99'],
        'checks{page:order}': ['rate>=0.99'], // check assertion by tag page:order
    }
}

const httpErrors = new Counter('http_error');

export default function () {
    // tag on request, customer metric, assertion (check() method)

    // get cart data
    let res = http.get('https://run.mocky.io/v3/bf936b4b-c62b-42c8-a41d-521704287872'); // api should return 200
    if (res.error) {
        httpErrors.add(1, {page: 'cart'});
    }
    check(res, {
        'status is 200': r => r.status === 200
    }, {page: 'cart'}); // tagging a check


    // submit order
    res = http.get(
        'https://run.mocky.io/v3/5693d50a-b8fa-41dd-ad50-35e7ab929d8f?mocky-delay=2000ms',
        {
            tags: {
                page: 'order',
            }
        }
    ); // api should return 201
    if (res.error) {
        httpErrors.add(1, {page: 'order'});
    }
    check(res, {
        'status is 201': r => r.status === 201
    }, {page: 'order'}) // tagging a check
}
