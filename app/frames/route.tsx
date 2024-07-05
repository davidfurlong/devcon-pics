import { Button } from "frames.js/next";
import { frames } from "./frames";

import { promises as fs } from "fs";
import path from "path";

/** Fetch pictures */
const publicDirectory = path.join(process.cwd(), "public", "pics");
const files = await getFiles(publicDirectory);
const pictures = files.map((file) => path.relative(publicDirectory, file));
const lastPage = pictures.length;

const pageHandler = frames(async (ctx) => {
  const page = parseInt(ctx.searchParams.page || "1");

  return {
    // will serve the images in their original format. Unfortunately Warpcast sets a 10MB limit, so larger images will fail.
    image: `${process.env.NEXT_PUBLIC_HOST}/pics/${pictures[page - 1]}`,
    buttons: [
      <Button action="post" target={{ query: { page: Math.max(1, page - 1) } }}>
        {page === 1 ? " " : "←"}
      </Button>,
      <Button
        action="post"
        target={{ query: { page: Math.min(lastPage, page + 1) } }}
      >
        {page === lastPage ? " " : "→"}
      </Button>,
    ],
  };
});

export const GET = pageHandler;
export const POST = pageHandler;

async function getFiles(dir: any) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files: any = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}
