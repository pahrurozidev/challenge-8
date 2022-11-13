/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../../../app");
const { Car } = require("../../../app/models");

// Function for testing endpoint delete car
describe("DELETE /v1/cars/:id", () => {
    let car, accessToken;

    // Create dummy data for testing before every 'it' method
    beforeEach(async () => {
        //jest.setTimeout(10000);
        const id = 2000;
        const name = "Mobile Command Center";
        const price = 5000000;
        const size = "LARGE";
        const image = "https://source.unsplash.com/519x519";
        const isCurrentlyRented = false;

        accessToken = await request(app).post("/v1/auth/login").send({
            email: "pahrurozi@binar.co.id",
            password: "123456",
        });

        // Creating Dummy Data
        car = await Car.create({
            name,
            price,
            size,
            image,
            isCurrentlyRented,
        });

        return car, accessToken;
    });

    // Delete dummy data after every 'it' method
    afterEach(() => car.destroy());

    // State what the response should be if status code 204
    it("should response with 204 as status code", async () => {
        return request(app)
            .delete("/v1/cars/" + car.id)
            .set("Authorization", `Bearer ${accessToken.body.accessToken}`)
            .then((res) => {
                expect(res.statusCode).toBe(204);
            });
    });

    // State what the response should be if status code 422
    // it("should response with 422 as status code", async () => {
    //     const carError = {
    //         id: {},
    //         name: {},
    //         price: {},
    //         size: {},
    //         image: {},
    //         isCurrentlyRented: {},
    //     };

    //     return request(app)
    //         .delete("/v1/cars/" + carError.id)
    //         .set("Authorization", `${accessToken.body.accessToken}`)
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