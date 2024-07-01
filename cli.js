import http from 'k6/http';

export const options = {
    vus: 10,
    duration: '10s',
}

export default function () {
    http.get('https://test.k6.io');

    // override the default options
    // k6 run cli.js --vus 1 --duration 10s --iterations 2
    // k6 run cli.js -u 1 -d 10s -i 2

    // skip tls verify
    // k6 run cli.js --insecure-skip-tls-verify

    // output
    // k6 run cli.js --summary-export=summary_output.json
    // k6 run cli.js --out json=full_output.json

    // exit code: `echo $?` to check last exit code

    // k6 cloud cli.js --token fd046e4c...
}
