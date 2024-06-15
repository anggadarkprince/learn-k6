import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    vus: 1,
    duration: '30s',
}

export default function () {
    http.get('https://test.k6.io', 'Hello world!');
    sleep(1);
    http.get('https://test.k6.io/contact.php');
    sleep(2);
    http.get('https://test.k6.io/news.php');
    sleep(2);
}

// Smoke tests verify the system functions with minimal load,
// and they are used to gather baseline performance values. Smoke tests are also called shakeout tests.
// We can start with 1 vus (depends on system model, for very high throughput app, mini-test can be started from 100 vus).
// If the smoke test failed, then maybe fundamental of the app is wrong implemented
