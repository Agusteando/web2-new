// server/routes/virtual/[blob].get.ts
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileTypeFromBuffer } from "file-type";

export default defineEventHandler(async (event) => {
  const blob = getRouterParam(event, "blob") || "";

  // prevent path traversal
  if (!blob || blob.includes("..") || blob.includes("/") || blob.includes("\\")) {
    throw createError({ statusCode: 400, statusMessage: "Invalid blob" });
  }

  // Point this to the REAL physical folder behind the IIS virtual directory
  // (use env var in prod so you don't hardcode drive letters)
  const baseDir = process.env.VIRTUAL_BLOBS_DIR || "D:\\virtual";
  const filePath = join(baseDir, blob);

  let buf: Buffer;
  try {
    buf = await readFile(filePath);
  } catch {
    throw createError({ statusCode: 404, statusMessage: "Not found" });
  }

  const ft = await fileTypeFromBuffer(buf);
  const mime = ft?.mime || "application/octet-stream";

  setHeader(event, "Content-Type", mime);
  setHeader(event, "Content-Disposition", "inline");
  setHeader(event, "Cache-Control", "public, max-age=31536000, immutable");

  return buf;
});
