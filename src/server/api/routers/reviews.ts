import { z } from "zod";
import { PrismaClient } from '@prisma/client';
import { createTRPCRouter, publicProcedure} from "../trpc";



const prisma = new PrismaClient();

const reviewSchema = z.object({
  title: z.string(),
  description: z.string(),
  user: z.string(),
  icebreakerID: z.number(),
  score: z.number(),
});

export const reviewRouter = createTRPCRouter({

    getReviewByGame: publicProcedure
        .input(z.object({ibId: z.number()}))
        .query(async({ctx, input}) => {
            const reviews = await ctx.db.review.findMany({where: {icebreaker: input.ibId}})
            return reviews
    }),

    postReview: publicProcedure
        .input(z.object({
            // Title, description, author, icebreaker
            title: z.string(),
            description: z.string(),
            author: z.string(),
            gameID: z.number(),
            score: z.number()
        }))
        .mutation(async({ctx, input}) => {
            await ctx.db.review.create({
                data: {
                    title: input.title,
                    description: input.description,
                    user: input.author,
                    icebreaker: input.gameID,
                }
            }),
            await ctx.db.icebreakerScore.create({
                data: {
                    icebreaker: input.gameID,
                    userID: input.author,
                    score: input.score
                }
            
            })
        }),
    
    getAvgScoreByGame: publicProcedure
        .input(z.object({
            gameID: z.number()
        }))
        .query(async({ctx, input}) => {
           const averageScore = await ctx.db.icebreakerScore.aggregate({
                _avg: {
                    score: true,
                },
                where: {
                    icebreaker: input.gameID
                }
            })
            return averageScore
        })
})
