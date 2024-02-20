import type { Metadata } from "next";
import { redirect } from "next/navigation";

const metadataBaseUrlString = process.env.VERCEL_URL;

export const metadata: Metadata = {
  metadataBase: metadataBaseUrlString
    ? new URL(metadataBaseUrlString)
    : new URL("https://vbtc.org.au"),
  title: "Victorian Bitcoin Technology Club",
  description: "Supporting grassroots adoption in Victoria, Australia",
  openGraph: {
    title: "Victorian Bitcoin Technology Club",
    type: "website",
    url: "https://vbtc.org.au",
    images:
      "https://res.cloudinary.com/dgpuwpmjk/image/upload/v1708393812/vbtc-share-2_lgn49h.png",
  },
  twitter: {
    card: "summary_large_image",
    site: "@eMartiiin94",
    title: "Title webtsite",
    description: "this is the desciption",
    images: "url/image.png",
  },
};

export default function Page() {
  redirect("/en");
}
