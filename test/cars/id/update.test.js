const request = require('supertest');
const app = require('../../../app');
const { Car } = require('../../../app/models');

describe('PUT /v1/cars/:id', () => {
    let car, accessToken;

    beforeEach(async () => {
        const id = 200;
        const name = 'Mobile Command Center';
        const price = 5000000;
        const size = 'LARGE';
        const image = 'https://source.unsplash.com/519x519';
        const isCurrentlyRented = false;

        car = await Car.create({
            id,
            name,
            price,
            size,
            image,
            isCurrentlyRented,
        });

        accessToken = await request(app).post('/v1/auth/login').send({
            email: 'pahrurozi@binar.co.id',
            password: '123456',
        });

        return car, accessToken;
    });

    // Delete dummy data after every 'it' method
    afterEach(() => car.destroy());

    it('should response with 200 as status code', async () => {
        const name = 'Kotsaka';
        const price = 15000000;
        const size = 'LARGE';
        const image = 'https://source.unsplash.com/519x519';

        return request(app)
            .put('/v1/cars/' + car.id)
            .set('Authorization', `Bearer ${accessToken.body.accessToken}`)
            .set('Content-Type', 'application/json')
            .send({
                name, price, size, image,
            })
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        price: expect.any(Number),
                        size: expect.any(String),
                        image: expect.any(String),
                        isCurrentlyRented: expect.any(Boolean),
                    }),
                );
            });
    });
});
