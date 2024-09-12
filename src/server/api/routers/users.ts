import * as trpc from "@trpc/server";
import { z } from "zod";
import { PrismaClient } from '@prisma/client';
import { createTRPCRouter, publicProcedure} from "../trpc";

const prisma = new PrismaClient();

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  admin: z.number() //FIKS
});

export const usersRouter = createTRPCRouter({

  createUser: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.user.create({
          data: {
            username: input.username,
            password: input.password
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),

  findUser: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )  
    .query(async ({ ctx, input }) => {
        // Find the user by username
        const user = await ctx.db.user.findUnique({
          where: {
            username: input.username,
            password: input.password,
          },
        });
        
        if (!user) {
          throw new trpc.TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          });
        }

        return true;
      })
})  