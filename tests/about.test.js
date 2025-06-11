const request = require('supertest');
const express = require('express');
const aboutRouter = require('../routes/about');

const app = express();
app.use('/about', aboutRouter);

describe('GET /about', () => {
    it('should return a list of users with first_name and last_name', async () => {
        const res = await request(app).get('/about');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toEqual([
            { first_name: 'Elisha', last_name: 'Lapid' },
            { first_name: 'Shlomo', last_name: 'Geva' }
        ]);
    });
});