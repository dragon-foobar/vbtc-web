import { sectionRenderer } from "@/app/[lang]/utils/section-renderer";
import { Metadata, ResolvingMetadata } from "next";
import { getPageBySlug } from "@/app/[lang]/utils/get-page-by-slug";
import {
  FALLBACK_SEO,
  FALLBACK_OPEN_GRAPH,
} from "@/app/[lang]/utils/constants";

type Props = {
  params: {
    lang: string;
    slug: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug, lang } = params;
  const page = await getPageBySlug(slug, lang);

  if (!page.data[0].attributes?.seo) return FALLBACK_SEO;
  const metadata = page.data[0].attributes.seo;

  const previousImages =
    (await parent).openGraph?.images || FALLBACK_OPEN_GRAPH.images;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    authors: {
      name: metadata.author,
    },
    keywords: metadata.keywords ? metadata.keywords.split(",") : "",
    creator: "Victorian Bitcoin Technology Club Inc.",
    openGraph: {
      ...FALLBACK_OPEN_GRAPH,
      ...metadata.openGraph,
      images: metadata.imageUrl || previousImages,
    },
  };
}

export default async function PageRoute({ params }: Props) {
  const page = await getPageBySlug(params.slug, params.lang);
  if (page.data.length === 0) return null;
  const contentSections = page.data[0].attributes.contentSections;
  return contentSections.map((section: any, index: number) =>
    sectionRenderer(section, index)
  );
}
