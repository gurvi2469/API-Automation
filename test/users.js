let request = require('supertest');
let { expect, assert } = require('chai');
const baseURL = "jsonplaceholder.typicode.com";
request = request(baseURL);


describe('users API', function () {
    it('GET-list all users   /users', function (done) {
        request
            .get('/users').end(function (err, res) {
                expect(res).to.not.be.empty;   // asserts if GET response is not empty
                done();  // it's a callback waiting for the test to be completed.
            });
    });

    it('GET-user information of a particular id   /users/:id', function () {
        let user_id = 1;

        return request.get(`/users/${user_id}`).
            set('Content-Type', 'application/json').  //set headers for a request
            set('Accept', 'application/json').
            then(function (res) {
                expect(res.body.id).to.be.eq(user_id);  // confirms if returned id is equal to expected post_id
            })

    });


    it('POST-create new user  /users', function () {

        const data = { 'name': 'sample', 'username': 'sample', email: 'sample@sample.com' };
        return request.post('/users').
            set('Content-type', 'application/json; charset=UTF-8').
            send(data). // send the payload in the body of the request
            expect(201); // assert if the response code is 201 - that is resource is created
    });


    it('PUT-change email address /users/:id', function () {
        const user_id = 1;
        const updated_data = { 'username': 'Bret Johnson' };
        return request.put(`/users/${user_id}`).
            set('Content-type', 'application/json charset=UTF-8').
            send(updated_data).
            expect(200);
    });


    it('DELETE /users/:id', function () {
        const user_id = 1;
        return request.delete(`/users/${user_id}`).
            expect(200)
    });


    it("using the response from one call in the request for another", function () {
        return request.get('/users').  //make first request to get all the users
            expect(200).
            then(function (res) {   // get the user id of first user and make second call to update his email
                user_id = res.body[0].id;
                return request.put(`/users/${user_id}`).send({ 'email': 'sampleEmail@jsonplaceholder.com' }).expect(200);
            });
    });
});
