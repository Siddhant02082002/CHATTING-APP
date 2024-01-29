import { createNextRouteHandler } from "uploadthing/next";

import { OurFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
    router: OurFileRouter,
});