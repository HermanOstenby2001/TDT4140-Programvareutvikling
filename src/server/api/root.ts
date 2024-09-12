import { createTRPCRouter } from "~/server/api/trpc";
import { icebreakersRouter } from "~/server/api/routers/icebreakers";
import { usersRouter } from "~/server/api/routers/users";
import { playlistsRouter } from "~/server/api/routers/playlists";
import { reviewRouter } from "./routers/reviews";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  icebreakers: icebreakersRouter,
  users: usersRouter,
  playlists: playlistsRouter,
  reviews: reviewRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
