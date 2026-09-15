import "dotenv/config";
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: "production",
  release: "fastify-typescript-starter@1.5.0",
  tracesSampleRate: 1.0,
});
