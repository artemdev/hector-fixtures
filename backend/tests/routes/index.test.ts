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
	test('Should return a default greeting when no name is provided', async () => {
		const response = await server.inject({
			method: 'GET',
			path: '/greeting',
		});
		expect(response.statusCode).eq(200);
		expect(response.json()).deep.eq({ greeting: 'Hello, there!' });
	});

	test('Should return a greeting with the trimmed name', async () => {
		const response = await server.inject({
			method: 'GET',
			path: '/greeting',
			query: { name: '  World  ' },
		});
		expect(response.statusCode).eq(200);
		expect(response.json()).deep.eq({ greeting: 'Hello, World!' });
	});
});
