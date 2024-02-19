"use client";

import { formatDate } from "../utils/api-helpers";

interface QuoteProps {
  data: {
    quote: string;
    authorDescription: string;
    author: string;
    date: string;
    source: string;
  };
}

export default function Quote({ data }: QuoteProps) {
  const { quote, author, authorDescription, date, source } = data;

  return (
    <section>
      <div className="container mx-auto justify-center sm:py-8 lg:py-12">
        <div className="flex text-center pb-2 lg:pb-12 lg:px-32">
          <span className="text-9xl">“</span>
          <p className="text-center px-6 py-1 text-2xl xl:text-6xl md:text-4xl italic">
            {quote}
          </p>
          <span className="text-9xl">”</span>
        </div>
        <p className="text-right text-2xl pr-12 lg:pr-36">
          <b>{author}</b>
        </p>
        {authorDescription && (
          <p className="text-right text-lg pr-12 lg:pr-36">
            {authorDescription}
          </p>
        )}
        {date && (
          <p className="text-right text-sm pr-12 lg:pr-36">
            {`${formatDate(date)}${source ? ", " + source : ""}`}
          </p>
        )}
      </div>
    </section>
  );
}
