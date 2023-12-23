import { ImageItem } from "@/service/AssetGallery";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import * as fs from "node:fs";
import * as path from "path";

export async function GET() {
  const publicDirectory = path.join(process.cwd(), "public/gallery");

  return Response.json(
    fs.readdirSync(publicDirectory).map(
      (item) =>
        ({
          key: `gallery-${item}`,
          source: `/gallery/${item}`,
          name: item.split(".")[0],
        }) as ImageItem
    )
  );
}
