import type { Metadata } from "next";
import "./globals.css";
import { Fjalla_One } from "next/font/google";
import { Lora, Montserrat } from "next/font/google";
import { getStrapiMedia, getStrapiURL } from "./utils/api-helpers";
import { fetchAPI } from "./utils/fetch-api";
import { ThemeProvider } from "./providers";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { FALLBACK_SEO } from "@/app/utils/constants";
import { getPageBySlug } from "@/app/utils/get-page-by-slug";

const metadataBaseUrlString = process.env.VERCEL_URL;

const lora = Lora({
  display: "swap",
  variable: "--font-lora",
  subsets: ["latin"],
  adjustFontFallback: false,
});

const montserrat = Montserrat({
  display: "swap",
  variable: "--font-montserrat",
  subsets: ["latin"],
});

//👇 Configure the object for our second font
const fjallaOne = Fjalla_One({
  variable: "--font-fjalla-one",
  weight: "400",
  subsets: ["latin"],
});

async function getGlobal(): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "notificationBanner.link",
      "navbar.links",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
    ],
    locale: "en",
  };
  return await fetchAPI(path, urlParamsObject, options);
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getGlobal();
  const page = await getPageBySlug("home");

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;
  const {
    keywords: pageKeywords,
    title,
    description,
    authors,
    openGraph: pageOpenGraph,
    twitter: pageTwitter,
  } = page.data[0].attributes.seo;

  const { title: globalTitle, description: globalDescription } = metadata;

  return {
    ...metadata,
    metadataBase: new URL("https://vbtc.org.au"),
    title: "Victorian Bitcoin Technology Club",
    description: description ? description : globalDescription,
    keywords: pageKeywords.split(","),
    authors,
    openGraph: {
      ...pageOpenGraph,
      title,
      description,
      url: "https://vbtc.org.au",
    },
    twitter: {
      ...pageTwitter,
      title,
      description,
    },
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const global = await getGlobal();
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data)
    return (
      <html>
        <body>
          <h1>Whoops</h1>
          <p>Something went wrong. Maybe come back later.</p>
        </body>
      </html>
    );

  const { notificationBanner, navbar, footer } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data.attributes.url
  );

  const footerLogoUrl = getStrapiMedia(
    footer.footerLogo.logoImg.data.attributes.url
  );

  return (
    <html
      lang="en-AU"
      className={`${lora.variable} ${fjallaOne.variable} ${montserrat.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar
            links={navbar.links}
            logoUrl={navbarLogoUrl}
            logoText={navbar.navbarLogo.logoText}
          />

          <main className="min-h-screen">{children}</main>

          {/* <Banner data={notificationBanner} /> */}

          <Footer
            logoUrl={footerLogoUrl}
            logoText={footer.footerLogo.logoText}
            menuLinks={footer.menuLinks}
            categoryLinks={footer.categories.data}
            legalLinks={footer.legalLinks}
            socialLinks={footer.socialLinks}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
