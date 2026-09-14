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
};

export default routes;
