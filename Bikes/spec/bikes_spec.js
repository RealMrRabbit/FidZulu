const request = require("request");

const base_url = 'http://localhost:3031/';

describe("Bike endpoint testing", function () {
    describe("GET bikes/team", () => {
        it("returns status code 200",  (done) => {
            request.get(base_url + 'bikes/team', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("contains member names", (done) => {
            request.get(base_url + 'bikes/team', (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("membersNames");
                done();
            });
        });
    });

    describe("GET bikes", () => {
        it("returns status code 404",  (done) => {
            request.get(base_url + 'bikes', (error, response, body) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
});