const request = require('supertest');
const express = require('express');
const contactRoute = require('../routes/contactus');

const app = express();
app.use('/api/contact', contactRoute);

describe('GET /api/contact', () => {
    it('should return contact information text', async () => {
        const res = await request(app).get('/api/contact');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Contact us at : bla@bla.com ');
    });
});