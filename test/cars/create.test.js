const request = require('supertest');
const app = require('../../app');

describe('GET /v1/cars', () => {
    let accessToken;

    beforeEach(async () => {
        accessToken = await request(app).post('/v1/auth/login').send({
            email: 'pahrurozi@binar.co.id',
            password: '123456',
        });

        return accessToken;
    });

    it('should response with 201 as status code and should response ', async () => {
        const name = 'Range Rover MX1';
        const price = 5000000;
        const image = 'string';
        const size = 'MEDIUM';

        return request(app)
            .post('/v1/cars')
            .set('Authorization', `Bearer ${accessToken.body.accessToken}`)
            .set('Content-Type', 'application/json')
            .send({
                name, price, image, size,
            })
            .then((res) => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        ...res.body,
                        name,
                        price,
                        image,
                        size,
                    }),
                );
            });
    });

    it('should response with 422 as status code', async () => {
        const name = [];
        const price = null;
        const size = 2;
        const image = '';

        return request(app)
            .post('/v1/cars')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${accessToken.body.accessToken}`)
            .send({
                name, price, size, image,
            })
            .then((res) => {
                expect(res.statusCode).toBe(422);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        error: {
                            name: expect.any(String),
                            message: expect.any(String),
                        },
                    }),
                );
            });
    });
});
