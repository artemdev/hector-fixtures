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

describe('POST /sentry/webhook', () => {
	test('Should acknowledge the webhook', async () => {
		const response = await server.inject({
			method: 'POST',
			path: '/sentry/webhook',
			payload: { action: 'created' },
		});
		expect(response.statusCode).eq(200);
		expect(response.json()).deep.eq({ ok: true });
	});
});
