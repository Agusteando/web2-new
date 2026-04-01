import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { defineEventHandler, setHeader } from "h3";

/**
 * Ensure /ads.txt is always accessible at the root, even with
 * catch-all routing architectures or serverless deployment models.
 */
export default defineEventHandler(async (event) => {
  const debug =
    (process.env.DEBUG_LEGACY ?? "").toLowerCase() === "1" ||
    (process.env.DEBUG_LEGACY ?? "").toLowerCase() === "true";

  // Standard local or PM2 paths
  const devPath = join(process.cwd(), "public", "ads.txt");
  const prodPath = join(process.cwd(), ".output", "public", "ads.txt");

  let txt: string | null = null;
  let source: string | null = null;

  try {
    txt = await readFile(devPath, "utf8");
    source = devPath;
  } catch {
    try {
      txt = await readFile(prodPath, "utf8");
      source = prodPath;
    } catch {
      txt = null;
      source = null;
    }
  }

  // Resiliency for Serverless (Vercel):
  // Serverless functions do not bundle the physical 'public' directory files with the execution context. 
  // If the file system read fails, we provide the raw text natively to ensure Google AdSense 
  // validators never receive a 404/500 if they hit this server route.
  if (!txt) {
    if (debug) {
      // eslint-disable-next-line no-console
      console.warn("[ads] ads.txt physical file not found (likely serverless environment), falling back to raw payload.");
    }
    txt = "google.com, pub-1644096973273978, DIRECT, f08c47fec0942fa0";
    source = "serverless_fallback";
  }

  if (debug) {
    // eslint-disable-next-line no-console
    console.log("[ads] Serving ads.txt", {
      source,
      length: txt.length,
    });
  }

  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  return txt;
});