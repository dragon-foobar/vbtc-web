import { sectionRenderer } from "@/app/utils/section-renderer";
import { Metadata, ResolvingMetadata } from "next";
import { getPageBySlug } from "@/app/utils/get-page-by-slug";
import { FALLBACK_SEO, FALLBACK_OPEN_GRAPH } from "@/app/utils/constants";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;
  const page = await getPageBySlug(slug);

  if (!page.data[0].attributes?.seo) return FALLBACK_SEO;
  const metadata = page.data[0].attributes.seo;

  const previousImages =
    (await parent).openGraph?.images || FALLBACK_OPEN_GRAPH.images;
  return FALLBACK_SEO;

  // return {
  //   title: metadata.metaTitle,
  //   description: metadata.metaDescription,
  //   authors: {
  //     name: metadata.author,
  //   },
  //   keywords: metadata.keywords ? metadata.keywords.split(",") : "",
  //   creator: "Victorian Bitcoin Technology Club Inc.",
  //   openGraph: {
  //     ...metadata.openGraph,
  //     images: [metadata.openGraph.images, previousImages],
  //   },
  // };
}

export default async function PageRoute({ params }: Props) {
  const page = await getPageBySlug(params.slug);

  if (page.data.length === 0) return null;
  const contentSections = page.data[0].attributes.contentSections;
  return contentSections.map((section: any, index: number) =>
    sectionRenderer(section, index)
  );
}
