const request = require('supertest');
const app = require('../../../app');
const { Car } = require('../../../app/models');

describe('POST /v1/cars/:id/rent', () => {
    let accessToken;

    beforeEach(async () => {
        accessToken = await request(app).post('/v1/auth/login').send({
            email: 'adji@binar.co.id',
            password: '123456',
        });

        return accessToken;
    });

    let car;
    beforeEach(async () => {
        car = await Car.create({
            name: 'My Car',
            price: 100000,
            size: 'Sedan',
            image: 'sedan.jpg',
            isCurrentlyRented: false,
        });
        return car;
    });

    it('should response with 201 as status code', async () => {
        const rentStartedAt = new Date();
        const rentEndedAt = new Date();

        return request(app)
            .post(`/v1/cars/${car.id}/rent`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${accessToken.body.accessToken}`)
            .send({ rentStartedAt, rentEndedAt })
            .then((res) => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        carId: expect.any(Number),
                        createdAt: expect.any(String),
                        id: expect.any(Number),
                        rentEndedAt: expect.any(String),
                        rentStartedAt: expect.any(String),
                        updatedAt: expect.any(String),
                        userId: expect.any(Number),
                    }),
                );
            });
    });
});
