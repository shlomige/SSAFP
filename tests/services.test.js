const request = require('supertest');
const express = require('express');


const servicesRouter = require('../routes/services'); // update the path

const app = express();
app.use('/services', servicesRouter);

describe('GET /services', () => {
    it('should return "our services page"', async () => {
        const res = await request(app).get('/services');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('our services page');
    });
});