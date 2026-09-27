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
});
