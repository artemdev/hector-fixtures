import { Type } from '@sinclair/typebox';
import type { FastifyPluginAsync } from 'fastify';

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

	const users = [
		{ id: 1, email: 'ada@example.com' },
		{ id: 2, email: 'linus@example.com' },
	];

	server.get(
		'/users/:id',
		{
			schema: {
				params: Type.Object({
					id: Type.Integer(),
				}),
				response: {
					200: Type.Object({
						id: Type.Number(),
						email: Type.String(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params as { id: number };
			const user = users.find((u) => u.id === id);
			if (!user) {
				return reply.code(404).send();
			}

			return { id: user.id, email: user.email.toLowerCase() };
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
