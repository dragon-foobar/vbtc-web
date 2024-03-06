import { Metadata, ResolvingMetadata } from "next";
import { TicketForm } from "@/app/components/TicketForm";
import { fetchAPI } from "@/app/utils/fetch-api";
import { FALLBACK_SEO } from "@/app/utils/constants";

type Props = {
  params: {
    eventId: string;
  };
};

const halvingEventPrice = process.env.HALVING_PARTY_PRICE;

const EVENTS = [
  {
    id: "halvingparty2024",
    title: "Halving Party 2024",
    price: halvingEventPrice,
  },
];

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
  return FALLBACK_SEO;
}

export default async function PageRoute({ params }: Props) {
  const eventId = params.eventId;
  const event = EVENTS.find((event) => eventId === event.id);
  return <TicketForm eventId={eventId} event={event} />;
}
