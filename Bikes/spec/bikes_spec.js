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
    describe("Get /bikes/all/:location", () => {
        it("should return prices with raleigh tax.", (done) => {
            request.get(base_url + 'bikes/all/raleigh', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toContain("Mamba Sport 12");
                expect(response.body).toContain("81.57");
                done();
            });
        })
        it("should return prices with durhm tax", (done) => {
            request.get(base_url + 'bikes/all/durham', (errpr, response, body) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toContain("Mamba Sport 12");
                expect(response.body).toContain("81.95");
                done();
            })
        })
    })
});