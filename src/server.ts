import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { createServerEntry } from "@tanstack/react-start/server-entry";

// Create the server entry with the default streaming handler. This
// processes incoming requests for SSR and server functions.
const handler = createStartHandler(defaultStreamHandler);

export default createServerEntry({ fetch: handler.fetch });
