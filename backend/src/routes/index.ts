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

	server.post('/sentry/webhook', async (request, reply) => {
		console.log('\n===== SENTRY WEBHOOK BODY =====');
		console.log(JSON.stringify(request.body, null, 2));
		console.log('===== END SENTRY WEBHOOK BODY =====\n');
		return reply.code(200).send({ ok: true });
	});
};

export default routes;
