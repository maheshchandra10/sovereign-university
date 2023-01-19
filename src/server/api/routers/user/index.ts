import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "server/api/trpc";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure.query(async ({ ctx }) => {
    if (ctx.session?.user) {
      return {
        username: ctx.session.user.username,
        isLoggedIn: true,
      };
    }

    return {
      username: null,
      isLoggedIn: false,
    };
  }),
});
