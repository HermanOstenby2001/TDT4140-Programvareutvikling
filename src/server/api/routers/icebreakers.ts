import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { PrismaClient } from '@prisma/client';
import { createTRPCRouter, publicProcedure} from "../trpc";

const prisma = new PrismaClient();

const icebreakerSchema = z.object({
  title: z.string(),
  description: z.string(),
  duration: z.number(),
  difficulty: z.number(),
  userID: z.string(),
  category: z.number(),
});

export const icebreakersRouter = createTRPCRouter({

  getAll: publicProcedure.query(async({ ctx }) => {
    const posts = await ctx.db.icebreaker.findMany();
    return posts;
  }),
  getGameById: publicProcedure
  .input(z.object({id: z.number()}))
  .query(async({ctx, input}) => {
    
    const post = await ctx.db.icebreaker.findUnique({where: {icebreakerID: input.id}});
    return post;
  }),

  postMessage: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        duration: z.number(),
        difficulty: z.number(),
        userID: z.string(),
        category: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.icebreaker.create({
          data: {
            title: input.title,
            description: input.description,
            duration: input.duration,
            difficulty: input.difficulty,
            userID: input.userID,
            category: input.category,
          },
        });
      } catch (error) {
        console.log(error);
      }
    })
});