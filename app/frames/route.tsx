import { Button } from "frames.js/next";
import { frames } from "./frames";

const pictures = [
  "Shintaro Yoshimatsu Photography (16).jpg",
  "Shintaro Yoshimatsu Photography (17).jpg",
  "Shintaro Yoshimatsu Photography (19).jpg",
  "Shintaro Yoshimatsu Photography (21).jpg",
  "Shintaro Yoshimatsu photo (3).jpg",
  "dev0372.jpg",
  "dev0387.jpg",
  "dev0388.jpg",
  "dev0389.jpg",
  "dev0406.jpg",
  "dev0411.jpg",
  "dev0426.jpg",
  "dev0432.jpg",
  "dev0434.jpg",
  "dev0496.jpg",
  "dev0500.jpg",
  "dev0514.jpg",
  "dev0521.jpg",
  "dev0531.jpg",
];


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
