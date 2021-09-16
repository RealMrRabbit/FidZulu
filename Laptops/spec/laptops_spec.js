const request = require("request");

const base_url = 'http://localhost:3035/';

describe("Laptops endpoint testing", function () {
    describe("GET laptops/team", () => {
        it("returns status code 200",  (done) => {
            request.get(base_url + 'laptops/team', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("contains team members' names", (done) => {
            request.get(base_url + 'laptops/team', (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("membersNames");
                done();
            });
        });
    });
    describe("GET laptops", () => {
        it("returns status code 404",  (done) => {
            request.get(base_url + 'laptops', (error, response, body) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
    describe("Get /laptops/all/:location", () => {
        
        it("should return prices with durham tax", (done) => {
            request.get(base_url + 'laptops/all/durham', (errpr, response, body) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toContain("ThinkPad T430s");
                expect(response.body).toContain("351.1");
                expect(response.body).toContain("MacBook Air");
                expect(response.body).toContain("671.52");
                done();
            })
        })
        
        it("should return prices with raleigh tax.", (done) => {
            request.get(base_url + 'laptops/all/raleigh', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toContain("ThinkPad T430s");
                expect(response.body).toContain("349.47");
                expect(response.body).toContain("MacBook Air");
                expect(response.body).toContain("668.41");
                done();
            });
        })
    })
});
