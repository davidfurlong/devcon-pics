import { fetchMetadata } from "frames.js/next";
import { Metadata } from "next";
import Link from "next/link";
import { appURL } from "./utils";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "devcon pics 2022",
    description: "devcon pics 2022",
    other: {
      ...(await fetchMetadata(new URL("/frames", appURL()))),
    },
  };
}

function DebugLink() {
  const debugUrl = new URL("http://localhost:3010");

  debugUrl.searchParams.set("url", appURL());

  return <Link href={debugUrl.toString()}>Debug</Link>;
}

// This is a react server component only
export default async function Home() {
  return (
    <div>
      gm. nothing here, try sharing as a frame.{" "}
      {process.env.NODE_ENV === "development" ? <DebugLink /> : null}
    </div>
  );
}
