import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Victorian Bitcoin Technology Club",
  description: "Supporting grassroots adoption in Victoria, Australia",
  openGraph: {
    title: "Victorian Bitcoin Technology Club",
    type: "website",
    url: "https://vbtc.org.au",
    images:
      "https://res.cloudinary.com/dgpuwpmjk/image/upload/v1708393812/vbtc-share-2_lgn49h.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
