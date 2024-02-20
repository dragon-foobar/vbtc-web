import { fetchAPI } from "@/app/utils/fetch-api";
import Post from "@/app/views/post";
import type { Metadata, ResolvingMetadata } from "next";
import { FALLBACK_OPEN_GRAPH } from "@/app/utils/constants";

type Props = {
  params: { slug: string };
};

async function getPostBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const urlParamsObject = {
    filters: { slug },
    populate: {
      cover: { fields: ["url"] },
      authorsBio: { populate: "*" },
      category: { fields: ["name"] },
      blocks: {
        populate: {
          __component: "*",
          files: "*",
          file: "*",
          url: "*",
          body: "*",
          title: "*",
          author: "*",
        },
      },
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

async function getMetaData(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
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

  const metadata = meta[0].attributes.seo;
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

export default async function PostRoute({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const data = await getPostBySlug(slug);
  if (data.data.length === 0) return <h2>no post found</h2>;
  return <Post data={data.data[0]} />;
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const articleResponse = await fetchAPI(
    path,
    {
      populate: ["category"],
    },
    options
  );

  return articleResponse.data.map(
    (article: {
      attributes: {
        slug: string;
        category: {
          slug: string;
        };
      };
    }) => ({ slug: article.attributes.slug, category: article.attributes.slug })
  );
}
