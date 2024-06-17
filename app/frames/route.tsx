import { Button } from "frames.js/next";
import { frames } from "./frames";

const pictures = [
  "dev0369.jpg",
  "dev0372.jpg",
  "dev0379.jpg",
  "dev0382.jpg",
  "dev0387.jpg",
  "dev0388.jpg",
  "dev0389.jpg",
  "dev0392.jpg",
  "dev0394.jpg",
  "dev0402.jpg",
  "dev0406.jpg",
  "dev0411.jpg",
  "dev0417.jpg",
  "dev0419.jpg",
  "dev0421.jpg",
  "dev0422.jpg",
  "dev0426.jpg",
  "dev0428.jpg",
  "dev0429.jpg",
  "dev0430.jpg",
  "dev0432.jpg",
  "dev0434.jpg",
  "dev0439.jpg",
  "dev0440.jpg",
  "dev0444.jpg",
  "dev0448.jpg",
  "dev0451.jpg",
  "dev0471.jpg",
  "dev0475.jpg",
  "dev0484.jpg",
  "dev0496.jpg",
  "dev0500.jpg",
  "dev0501.jpg",
  "dev0503.jpg",
  "dev0510.jpg",
  "dev0514.jpg",
  "dev0519.jpg",
  "dev0521.jpg",
  "dev0524.jpg",
  "dev0528.jpg",
  "dev0531.jpg",
  "dev0553.jpg",
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
