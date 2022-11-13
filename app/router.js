const express = require('express');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const bcrypt = require('bcryptjs');

const {
    ApplicationController,
    AuthenticationController,
    CarController,
} = require('./controllers');

const {
    User,
    Role,
    Car,
    UserCar,
} = require('./models');

function apply(app) {
    const carModel = Car;
    const roleModel = Role;
    const userModel = User;
    const userCarModel = UserCar;

    const applicationController = new ApplicationController();
    const authenticationController = new AuthenticationController({
        bcrypt, jwt, roleModel, userModel,
    });
    const carController = new CarController({ carModel, userCarModel, dayjs });

    const { accessControl } = authenticationController.accessControl;

    app.get('/', applicationController.handleGetRoot);

    // ============
    // Auth
    // ============

    // register -> true
    app.post('/v1/auth/register', authenticationController.handleRegister);
    // login -> true
    app.post('/v1/auth/login', authenticationController.handleLogin);
    // whoami -> true
    app.get('/v1/auth/whoami', authenticationController.authorize(accessControl.CUSTOMER), authenticationController.handleGetUser);

    // ============
    // Cars
    // ============

    // get all cars -> true
    app.get('/v1/cars', carController.handleListCars);
    // get by id -> true
    app.get('/v1/cars/:id', carController.handleGetCar);

    // create -> true
    app.post('/v1/cars', authenticationController.authorize(accessControl.ADMIN), carController.handleCreateCar);

    // add rent -> true
    app.post('/v1/cars/:id/rent', authenticationController.authorize(accessControl.CUSTOMER), carController.handleRentCar);

    // put -> False
    app.put('/v1/cars/:id', authenticationController.authorize(accessControl.ADMIN), carController.handleUpdateCar);

    // delete -> False
    app.delete('/v1/cars/:id', authenticationController.authorize(accessControl.ADMIN), carController.handleDeleteCar);

    app.use(applicationController.handleNotFound);
    app.use(applicationController.handleError);

    return app;
}

module.exports = { apply };
