import { ImageItem } from "@/service/AssetGallery";
import { NextApiRequest, NextApiResponse } from "next";
import * as fs from "node:fs";
import * as path from "path";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
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
