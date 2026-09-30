import { describe, expect, test } from 'vitest';
import server from '../../src/server';

describe('GET /', () => {
	test('Should return hello world', async () => {
		const response = await server.inject({
			method: 'GET',
			path: '/',
		});
		expect(response.statusCode).eq(200);
		expect(response.json()).deep.eq({ hello: 'world' });
	});
});

describe('GET /greeting', () => {
	test('Should return a greeting when name is provided', async () => {
		const response = await server.inject({
			method: 'GET',
			path: '/greeting?name=Artem',
		});
		expect(response.statusCode).eq(200);
		expect(response.json()).deep.eq({ greeting: 'Hello, Artem!' });
	});

	test('Should return a trimmed greeting for a valid name', async () => {
		const response = await server.inject({
			method: 'GET',
			path: '/greeting?name=%20John%20',
		});
		expect(response.statusCode).eq(200);
		expect(response.json()).deep.eq({ greeting: 'Hello, John!' });
	});

	test('Should return 400 when name is missing', async () => {
		const response = await server.inject({
			method: 'GET',
			path: '/greeting',
		});
		expect(response.statusCode).eq(400);
	});

	test('Should not crash when name is missing', async () => {
		const response = await server.inject({
			method: 'GET',
			path: '/greeting',
		});
		expect(response.statusCode).lessThan(500);
	});

	test('Should reject the request instead of crashing when name is blank', async () => {
		const response = await server.inject({
			method: 'GET',
			path: '/greeting?name=',
		});
		expect(response.statusCode).eq(400);
	});
});

describe('GET /orders/:id/summary', () => {
	test('Should summarise the order total', async () => {
		const response = await server.inject({
			method: 'GET',
			path: '/orders/o-1/summary',
		});
		expect(response.statusCode).eq(200);
		expect(response.json()).deep.eq({ summary: 'Order o-1: 19.90 EUR' });
	});

	test('Should return 404 for an unknown order', async () => {
		const response = await server.inject({
			method: 'GET',
			path: '/orders/o-404/summary',
		});
		expect(response.statusCode).eq(404);
	});
});
