import { z } from 'zod';

import { publicProcedure } from '../../procedures';
import { createCallbackLnurlAuth } from '../../services/lnurl/auth/callback';
import { createGenerateLnurlAuth } from '../../services/lnurl/auth/generate';
import { createPollLnurlAuth } from '../../services/lnurl/auth/poll';
import { createTRPCRouter } from '../../trpc';

const lud4GenerateProcedure = publicProcedure
  .input(z.void())
  .output(
    z.object({
      lnurl: z.string(),
    }),
  )
  .query(({ ctx }) =>
    createGenerateLnurlAuth(ctx.dependencies)({ sessionId: ctx.sessionId }),
  );

const lud4CallbackProcedure = publicProcedure
  .meta({
    openapi: {
      method: 'GET',
      path: '/auth/lud4',
    },
  })
  .input(
    z.object({
      tag: z.string(),
      k1: z.string(),
      sig: z.string(),
      key: z.string(),
      hmac: z.string(),
    }),
  )
  .output(
    z.object({
      status: z.string(),
      reason: z.string().optional(),
    }),
  )
  .query(({ ctx, input }) => createCallbackLnurlAuth(ctx.dependencies)(input));

const lud4PollProcedure = publicProcedure
  .input(z.void())
  .output(
    z.object({
      uid: z.string(),
    }),
  )
  .query(({ ctx }) =>
    createPollLnurlAuth(ctx.dependencies)({ sessionId: ctx.sessionId }),
  );

export const lud4AuthRouter = createTRPCRouter({
  generate: lud4GenerateProcedure,
  callback: lud4CallbackProcedure,
  poll: lud4PollProcedure,
});
