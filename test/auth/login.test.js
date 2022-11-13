const request = require('supertest');
const app = require('../../app');

describe('POST /v1/auth/login', () => {
    it("should response with 201 as status code", async () => {
        const email = "adji@binar.co.id";
        const password = "123456";

        return request(app)
            .post("/v1/auth/login")
            .set("Content-Type", "application/json")
            .send({ email, password })
            .then((res) => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        accessToken: expect.any(String),
                    })
                );
            });
    });

    it("should response with 404 as status code", async () => {
        const email = "ucok@binar.co.id";
        const password = "abogoboga";

        return request(app)
            .post("/v1/auth/login")
            .set("Content-Type", "application/json")
            .send({ email, password })
            .then((res) => {
                expect(res.statusCode).toBe(404);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        error: {
                            details: expect.any(Object),
                            message: expect.any(String),
                            name: expect.any(String),
                        },
                    })
                );
            });
    });

    it("should response with 401 as status code", async () => {
        const email = "adji@binar.co.id";
        const password = "abogoboga";

        return request(app)
            .post("/v1/auth/login")
            .set("Content-Type", "application/json")
            .send({ email, password })
            .then((res) => {
                expect(res.statusCode).toBe(401);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        error: {
                            details: expect.any(Object),
                            message: expect.any(String),
                            name: expect.any(String),
                        },
                    })
                );
            });
    });
});
