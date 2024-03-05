import { fetchAPI } from "@/app/utils/fetch-api";
import Post from "@/app/views/post";
import type { Metadata, ResolvingMetadata } from "next";

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
