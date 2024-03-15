import { Metadata, ResolvingMetadata } from "next";
import { TicketForm } from "@/app/components/TicketForm";
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
