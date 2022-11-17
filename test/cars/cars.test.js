const request = require('supertest');
const app = require('../../app');
const { Car } = require('../../app/models');

describe('GET /v1/cars', () => {
    let car;
    beforeEach(async () => {
        car = await Car.create({
            name: 'BMW',
            price: 100000,
            size: 'Sedan',
            image: 'sedan.jpg',
            isCurrentlyRented: false,
        });
        return car;
    });
    afterEach(() => car.destroy());

    it('should response with 200 as status code', async () => {
        const page = 1;
        const pageSize = 10;

        return request(app)
            .get('/v1/cars')
            .set('Content-Type', 'application/json')
            .send({ page, pageSize })
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        cars: expect.arrayContaining([
                            expect.objectContaining({}),
                        ]),
                    }),
                    expect.objectContaining({
                        pagination: expect.any(Object),
                    }),
                );
            });
    });
});
