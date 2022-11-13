const request = require('supertest');
const app = require('../../../app');
const { Car } = require('../../../app/models');

describe('GET /v1/cars/:id', () => {
    let car;
    beforeEach(async () => {
        car = await Car.create({
            name: 'BMW',
            price: 100000,
            size: 'Sedan',
            image: 'https://www.bmw.co.id/content/dam/bmw/common/all-models/i-series/i4/navigation/bmw-i4-mini-landingpage-modelfinder.png',
            isCurrentlyRented: false,
        });
        return car;
    });
    afterEach(() => car.destroy());

    it('should response with 200 as status code', async () => {
        return request(app)
            .get(`/v1/cars/${car.id}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        name: car.name,
                        price: car.price,
                        size: car.size,
                        image: car.image,
                        isCurrentlyRented: car.isCurrentlyRented,
                    }),
                );
            });
    });
});
