import { ImageResponse } from "next/og";
import { default as NextImage } from "next/image";
import { getPageBySlug } from "./utils/get-page-by-slug";

export const runtime = "edge";

export const alt = "Association banner";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const page = await getPageBySlug("home");
  const url = page.data[0].attributes.seo.images;

  return new ImageResponse(
    (
      <NextImage
        src={url}
        width={500}
        height={500}
        fill={true}
        alt={alt}
      />
    ),
    {
      ...size,
    }
  );
}
