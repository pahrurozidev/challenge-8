/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../../app");

describe("GET /v1/auth/whoami", () => {
    it("should response with 200 as status code and res.json with newly car's instance", async () => {
        const accessToken = await request(app).post("/v1/auth/login").send({
            email: "fikri@binar.co.id",
            password: "123456",
        });

        return (
            request(app)
                .get("/v1/auth/whoami")
                .set("Authorization", `Bearer ${accessToken.body.accessToken}`)
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toEqual(
                        expect.objectContaining({
                            ...res.body,
                        })
                    );
                })
        );
    });
});