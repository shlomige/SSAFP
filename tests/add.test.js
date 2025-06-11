const request = require('supertest');
const app = require('../app'); // your Express app
const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('POST /api/add', () => {
    it('should create a new expense if all required fields are sent', async () => {
        const res = await request(app)
            .post('/api/add')
            .send({
                description: 'Test expense',
                category: 'food',
                sum: 100,
                userid: '123123',
                date: '2025-06-08'
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.description).toBe('Test expense');
    });

    it('should return 400 if a required field is missing', async () => {
        const res = await request(app)
            .post('/api/add')
            .send({
                category: 'food',
                sum: 100,
                userid: '123123'
            });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('missing required parameters');
    });
});