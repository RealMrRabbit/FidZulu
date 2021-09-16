const request = require("request");
const base_url = 'http://localhost:3032/';

describe("Book endpoint testing", function () {
    describe("GET books", () => {
        it("returns status code 200",  (done) => {
            request.get(base_url + 'books/all/raleigh', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("contains title", (done) => {
            request.get(base_url + 'books/all/raleigh', (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("Title");
                done();
            });
        });
    });
    describe("GET Books", () => {
        it("returns status code 404",  (done) => {
            request.get(base_url + 'books', (error, response, body) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
    describe("Get /books/all/:location", () => {
        it("should return prices with raleigh tax.", (done) => {
            request.get(base_url + 'books/all/raleigh', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toContain("Lord of the Rings");
                expect(response.body).toContain("27.94");
                done();
            });
        })
        it("should return prices with durham tax", (done) => {
            request.get(base_url + 'books/all/durham', (errpr, response, body) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toContain("Lord of the Rings");
                expect(response.body).toContain("28.07");
                done();
            })
        })
    })
});