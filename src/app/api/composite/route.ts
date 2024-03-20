import { ImageItem } from "@/service/AssetGallery";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import * as fs from "node:fs";
import * as path from "path";

export async function GET() {
  const publicDirectory = path.join(process.cwd(), "public/compsite");

  const children = fs.readdirSync(publicDirectory);

  const result = children.reduce((prev, child) => {
    return {
      ...prev,
      [child]: fs.readdirSync(path.join(publicDirectory, child)).map(
        (item) =>
          ({
            key: `gallery-${child}-${item}`,
            source: `/compsite/${child}/${item}`,
            name: `${child}-${item.split(".")[0]}`,
          }) as ImageItem
      ),
    };
  }, {});

  return Response.json(result);
}
