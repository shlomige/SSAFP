require('dotenv').config(); // <-- Make sure this line is first!
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('../routes/userDetails'); // adjust path if needed

const app = express();
app.use(express.json());
app.use('/users', usersRouter);

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET /users/:userId', () => {
    it('should return user info and total expenses if user exists', async () => {
        const res = await request(app).get('/users/123123');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('first name');
        expect(res.body).toHaveProperty('last name');
        expect(res.body).toHaveProperty('id', 123123);
        expect(res.body).toHaveProperty('total');
    });

    it('should return 404 if user does not exist', async () => {
        const res = await request(app).get('/users/999999');
        expect(res.statusCode).toBe(404);
        expect(res.text).toBe('User not found');
    });
});