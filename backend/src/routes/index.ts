import { Type } from '@sinclair/typebox';
import type { FastifyPluginAsync } from 'fastify';
import { findOrder } from '../data/orders.js';
import { formatPrice } from '../utils/format.js';

const routes: FastifyPluginAsync = async (server) => {
	server.get(
		'/',
		{
			schema: {
				response: {
					200: Type.Object({
						hello: Type.String(),
					}),
				},
			},
		},
    async () => {
      const state = {
        hello: 'world',
      }

      return state
		},
	);

	server.get(
		'/greeting',
		{
			schema: {
				querystring: Type.Object({
					name: Type.String({ minLength: 1 }),
				}),
				response: {
					200: Type.Object({
						greeting: Type.String(),
					}),
				},
			},
		},
		async (request) => {

			const { name } = request.query as { name: string };

			const greeting = `Hello, ${name.trim()}!`;

			return { greeting };
		},
	);

	server.get(
		'/orders/:id/summary',
		{
			schema: {
				params: Type.Object({
					id: Type.String(),
				}),
				response: {
					200: Type.Object({
						summary: Type.String(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params as { id: string };
			const order = await findOrder(id);
			if (!order) {
				return reply.code(404).send();
			}

			return { summary: `Order ${order.id}: ${formatPrice(order.total, order.currency)}` };
		},
	);

	server.post('/sentry/webhook', async (request, reply) => {
		console.log('\n===== SENTRY WEBHOOK BODY =====');
		console.log(JSON.stringify(request.body, null, 2));
		console.log('===== END SENTRY WEBHOOK BODY =====\n');
		return reply.code(200).send({ ok: true });
	});
};

export default routes;
