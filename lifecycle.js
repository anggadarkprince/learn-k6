import http from 'k6/http';
import {sleep} from "k6";

export const options = {
    vus: 2,
    duration: '5s',
}

console.log('-- init stage --');

export function setup() {
    console.log('-- setup stage --'); // only run once
    sleep(1);
    return {foo: 'bar'};
}

export default function (data) {
    console.log('-- VU stage --'); // run multiple
    // data (parameter) comes from setup
    console.log(data);
    http.get('https://run.mocky.io/v3/bf936b4b-c62b-42c8-a41d-521704287872'); // api should return 200
    http.get('https://run.mocky.io/v3/5693d50a-b8fa-41dd-ad50-35e7ab929d8f?mocky-delay=2000ms'); // api should return 201
    sleep(1);
    // after an iteration completed, a VU will repeat as long as the duration is not completed yet
}

export function teardown(data) {
    // data (parameter) comes from setup
    console.log('-- teardown stage --'); // only run once
}
