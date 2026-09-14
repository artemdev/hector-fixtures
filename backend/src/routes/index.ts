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
};

export default routes;
