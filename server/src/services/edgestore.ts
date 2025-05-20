// edgestore.ts
import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreExpressHandler } from "@edgestore/server/adapters/express";

const es = initEdgeStore.create();
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket(),
});
export type EdgeStoreRouter = typeof edgeStoreRouter;
export const handler = createEdgeStoreExpressHandler({
  router: edgeStoreRouter,
});
