import { z } from "zod";
import { hash, verify as verifyHash } from "argon2";
import { createTRPCRouter, publicProcedure } from "server/api/trpc";

const registerCredentialsSchema = z.object({
  username: z.string().min(6),
  password: z.string().min(8),
  email: z.string().email().optional(),
});

const loginCredentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const credentialsAuthRouter = createTRPCRouter({
  register: publicProcedure
    .meta({ openapi: { method: "POST", path: "/auth/credentials" } })
    .input(registerCredentialsSchema)
    .output(z.object({ status: z.number(), message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.session?.user) {
        return {
          status: 401,
          message: "Already logged in",
        };
      }

      const hashedPassword = await hash(input.password);

      await ctx.prisma.user.create({
        data: {
          username: input.username,
          password: hashedPassword,
          email: input.email,
        },
      });

      ctx.session.user = {
        username: input.username,
        email: input.email,
        isLoggedIn: true,
      };
      await ctx.session.save();

      return {
        status: 201,
        message: "User created",
      };
    }),
  login: publicProcedure
    .input(loginCredentialsSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { username: input.username },
      });

      if (!user?.password) {
        return {
          status: 401,
          message: "This user has no password, try another login method",
        };
      }

      if (!user || !(await verifyHash(user.password, input.password))) {
        return {
          status: 401,
          message: "Invalid credentials",
        };
      }

      ctx.session.user = {
        username: input.username,
        email: user.email || undefined,
        isLoggedIn: true,
      };
      await ctx.session.save();

      return {
        status: 200,
        message: "Logged in",
      };
    }),
});
