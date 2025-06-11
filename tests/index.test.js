const express = require('express');
const request = require('supertest');
const homeRoute = require('../routes/index');

describe('GET /', () => {
    let app;

    beforeAll(() => {
        app = express();


        app.use((req, res, next) => {
            res.render = jest.fn((view, options) => {
                res.send({ view, options }); // send JSON response for testing
            });
            next();
        });

        app.use('/', homeRoute);
    });

    it('should render the index view with title Express', async () => {
        const res = await request(app).get('/');

        expect(res.statusCode).toBe(200);
        expect(res.body.view).toBe('index');
        expect(res.body.options).toEqual({ title: 'Express' });
    });
});