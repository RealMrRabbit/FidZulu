const request = require("request");

const base_url = 'http://localhost:3036/';

describe("Toys endpoint testing", function () {
    describe("GET toys/team", () => {
        it("returns status code 200",  (done) => {
            request.get(base_url + 'toys/team', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("contains team members' names", (done) => {
            request.get(base_url + 'toys/team', (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("memberNames");
                done();
            });
        });
    });
    describe("GET toys", () => {
        it("returns status code 404",  (done) => {
            request.get(base_url + 'toys', (error, response, body) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
    describe("Get /toys/all/:location", () => {
        
        it("should return prices with durham tax", (done) => {
            request.get(base_url + 'toys/all/durham', (errpr, response, body) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toContain("Medical Kit");
                expect(response.body).toContain("22.04");
                expect(response.body).toContain("Ferry Boat");
                expect(response.body).toContain("14.32");
                done();
            })
        })
        
        it("should return prices with raleigh tax.", (done) => {
            request.get(base_url + 'toys/all/raleigh', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toContain("Medical Kit");
                expect(response.body).toContain("21.94");
                expect(response.body).toContain("Ferry Boat");
                expect(response.body).toContain("14.25");
                done();
            });
        })
    })
});