const request = require('supertest');
const app = require('../app');
const { connectDB} = require('../db');

describe('GET /api/report', () => {
    it('should return 400 if id, year, or month is missing', async () => {
        const res = await request(app).get('/api/report');
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    it('should return 200 and report structure when id, year, and month are provided', async () => {
        const res = await request(app)
            .get('/api/report')
            .query({ id: '123123', year: '2025', month: '11' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('userid', '123123');
        expect(res.body).toHaveProperty('year', 2025);
        expect(res.body).toHaveProperty('month', 11);
        expect(res.body).toHaveProperty('costs');
        expect(Array.isArray(res.body.costs)).toBe(true);
    });
});