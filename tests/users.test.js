const request = require('supertest');
const express = require('express');
const usersRouter = require('../routes/users');

const app = express();
app.use('/api/users', usersRouter);

describe('GET /api/users', () => {
    it('should return a default text response', async () => {
        const response = await request(app).get('/api/users');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('respond with a resource');
    });
});