import http from 'k6/http';
import {check} from "k6";

export default function () {
    const params = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const data = {
        username: "angga.ari." + Date.now(),
        first_name: "Angga Ari Wijaya",
        password: "secret"
    };

    let response = http.post('https://test-api.k6.io/user/register/', JSON.stringify(data), params);
    console.log('My username', response.json().username);

    response = http.post('https://test-api.k6.io/auth/token/login/', JSON.stringify({
        username: data.username,
        password: data.password,
    }), params);

    const accessToken = response.json().access;
    console.log('My access token', accessToken);

    const authParams = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    };

    const createCrocodileResponse = http.post('https://test-api.k6.io/my/crocodiles/', JSON.stringify({
        name: "Random croc",
        sex: "M",
        date_of_birth: "1900-10-28"
    }), authParams);
    const createdCrocodile = createCrocodileResponse.json();
    console.log('Created crocodile', createdCrocodile);

    const myCrocodileResponse = http.get(`https://test-api.k6.io/my/crocodiles/${createdCrocodile.id}/`, authParams);
    const myCrocodile = myCrocodileResponse.json();
    console.log('My crocodile', myCrocodile);

    check(myCrocodileResponse, {
        'status is 200': r => r.status === 200,
        'crocodile id': r => r.json().id === createdCrocodile.id
    })

    const myCrocodilesResponse = http.get('https://test-api.k6.io/my/crocodiles/', authParams);
    const myCrocodiles = myCrocodilesResponse.json();
    console.log('My all crocodiles', myCrocodiles);

    // PUT: should send all fields
    const updateCrocodileResponse = http.put(`https://test-api.k6.io/my/crocodiles/${myCrocodile.id}/`, JSON.stringify({
        name: "Random croc updated",
        sex: "M",
        date_of_birth: "1900-10-28"
    }), authParams);
    const updatedCrocodile = updateCrocodileResponse.json();
    console.log('Updated crocodile', updatedCrocodile);

    // PATCH: update some field only
    const patchCrocodileResponse = http.patch(`https://test-api.k6.io/my/crocodiles/${myCrocodile.id}/`, JSON.stringify({
        sex: "F",
    }), authParams);
    const patchedCrocodile = patchCrocodileResponse.json();
    console.log('Patched crocodile', patchedCrocodile);

    // DELETE
    const deleteCrocodileResponse = http.del(`https://test-api.k6.io/my/crocodiles/${myCrocodile.id}/`, null, authParams);
    console.log('Deleted crocodile', deleteCrocodileResponse.status);
}
