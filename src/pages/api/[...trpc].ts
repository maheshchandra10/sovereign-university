import { createOpenApiNextHandler } from "trpc-openapi";

import { env } from "../../env/server.mjs";
import { appRouter } from "../../server/api/root";
import { createTRPCContext } from "../../server/api/trpc";

export default createOpenApiNextHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ req, error }) => {
          console.error(
            `❌ OpenAPI failed on ${req.url ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});
