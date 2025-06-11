const request = require('supertest');
const express = require('express');
const router = require('../routes/products');

const app = express();
app.use('/products', router);

describe('Products API', () => {
    test('GET /products should return "products page"', async () => {
        const res = await request(app).get('/products');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('products page');
    });

    test('GET /products/:id should return product id', async () => {
        const res = await request(app).get('/products/42');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('products id:42');
    });
});