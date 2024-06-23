import http from 'k6/http';
import {randomItem} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {check} from 'k6';
import {SharedArray} from 'k6/data';

// SharedArray is an array-like object that shares the underlying memory between VUs.
// The function executes only once, and its result is saved in memory once.
const userCredentials = new SharedArray('users with credentials', function () {
    return JSON.parse(open('./users.json')).users;
});

// not using SharedArray here will mean that the code in the function call (that is what loads and
// parses the json) will be executed per each VU which also means that there will be a complete copy
// per each VU

export default function () {
    const randomCredential = randomItem(userCredentials);

    let res = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify(
            {
                username: randomCredential.username,
                password: randomCredential.password
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    check(res, {
        'status is 200': (r) => r.status === 200,
        'has access token': (r) => r.json() !== undefined
    });

    const accessToken = res.json().access;
    console.log('Access Token: ', accessToken);
}

