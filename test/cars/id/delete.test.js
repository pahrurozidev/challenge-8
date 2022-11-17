const request = require('supertest');
const app = require('../../../app');
const { Car } = require('../../../app/models');

describe('DELETE /v1/cars/:id', () => {
    let car, accessToken;

    beforeEach(async () => {
        const id = 1000;
        const name = 'Mobile';
        const price = 1000000;
        const size = 'LARGE';
        const image = 'mobile.jpg';
        const isCurrentlyRented = false;

        accessToken = await request(app).post('/v1/auth/login').send({
            email: 'pahrurozi@binar.co.id',
            password: '123456',
        });

        car = await Car.create({
            id,
            name,
            price,
            size,
            image,
            isCurrentlyRented,
        });

        return car, accessToken;
    });

    afterEach(() => car.destroy());

    it('should response with 204 as status code', async () => {
        return request(app)
            .delete('/v1/cars/' + car.id)
            .set('Authorization', `Bearer ${accessToken.body.accessToken}`)
            .then((res) => {
                expect(res.statusCode).toBe(204);
            });
    });
});
