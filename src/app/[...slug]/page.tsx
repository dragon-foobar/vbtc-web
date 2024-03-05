import { sectionRenderer } from "@/app/utils/section-renderer";
import { Metadata, ResolvingMetadata } from "next";
import { getPageBySlug } from "@/app/utils/get-page-by-slug";
import { fetchAPI } from "../utils/fetch-api";

type Props = {
  params: {
    slug: string;
  };
};

async function getMetaData(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/pages`;
  const urlParamsObject = {
    filters: { slug },
    populate: { seo: { populate: "*" } },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response.data;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const meta = await getMetaData(slug);
  const parentData = await parent;

  const metadata = meta[0].attributes.seo;
  const previousOpenGraphImages = parentData.openGraph?.images;
  const previousTwitterImages = parentData.twitter?.images;

  return {
    title: `${metadata.title} | Victorian Bitcoin Technology Club`,
    description: metadata.description,
    keywords: metadata.keywords.split(","),
    authors: metadata.authors,
    openGraph: {
      ...metadata.openGraph,
      title: metadata.title,
      description: metadata.description,
      url: `https://vbtc.org.au/articles/${params.slug}`,
      images: previousOpenGraphImages
        ? [metadata.openGraph.images, ...previousOpenGraphImages]
        : metadata.openGraph.images,
    },
    twitter: {
      ...metadata.twitter,
      title: metadata.title,
      description: metadata.description,
      images: previousTwitterImages
        ? [metadata.openGraph.images, ...previousTwitterImages]
        : metadata.openGraph.images,
    },
  };
}

export default async function PageRoute({ params }: Props) {
  const page = await getPageBySlug(params.slug);

  if (page.data.length === 0) return null;
  const contentSections = page.data[0].attributes.contentSections;
  return contentSections.map((section: any, index: number) =>
    sectionRenderer(section, index)
  );
}
