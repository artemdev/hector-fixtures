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

	server.post('/sentry/webhook', async (request, reply) => {
		console.log('\n===== SENTRY WEBHOOK BODY =====');
		console.log(JSON.stringify(request.body, null, 2));
		console.log('===== END SENTRY WEBHOOK BODY =====\n');
		return reply.code(200).send({ ok: true });
	});
};

export default routes;
