const request = require('supertest');
const app = require('../../app');

describe('POST /v1/auth/register', () => {
    it("should response with 201 as status code", async () => {
        const password = "rahasia";
        const name = "fikri" + Math.random();
        const email = name + "@gmail.com";

        return request(app)
            .post("/v1/auth/register")
            .set("Content-Type", "application/json")
            .send({ name, email, password })
            .then((res) => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        accessToken: expect.any(String),
                    })
                );
            });
    });

    // it("should response with 422 as status code", async () => {
    //     const name = "fikri";
    //     const email = "fikri@gmail.com";
    //     const password = "123456";

    //     return request(app)
    //         .post("/v1/auth/register")
    //         .set("Content-Type", "application/json")
    //         .send({ name, email, password })
    //         .then((res) => {
    //             expect(res.statusCode).toBe(422);
    //             expect(res.body).toEqual(
    //                 expect.objectContaining({
    //                     error: {
    //                         name: expect.any(String),
    //                         message: expect.any(String),
    //                     },
    //                 })
    //             );
    //         });
    // });
});
