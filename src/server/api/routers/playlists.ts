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
  user: z.string(),
  category: z.number(),
});

const playlistSchema = z.object({
  title: z.string(),
  user: z.string(),
  icebreakers: z.array(icebreakerSchema),
});

export const playlistsRouter = createTRPCRouter({

  getAll: publicProcedure.query(async({ ctx }) => {
    return ctx.db.playlist.findMany()
  }),

  getPlaylistsByUserId: publicProcedure
  .input(z.object({id: z.string()}))
  .query(async({ctx, input}) => {
    
    const playlists = await ctx.db.playlist.findMany({where: {user: input.id}});
    return playlists;
  }),

  postPlaylist: publicProcedure
    .input(
      z.object({
        title: z.string(),
        user: z.string(),
        icebreakerIDs: z.array(z.number())
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.playlist.create({
          data: {
            title: input.title,
            user: input.user,
            icebreakers: {
              connect: input.icebreakerIDs.map(id => ({ icebreakerID: id })),
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    })
});