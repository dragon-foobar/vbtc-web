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
  isBlogQuote: boolean;
}

export default function Quote({ data, isBlogQuote }: QuoteProps) {
  const { quote, author, authorDescription, date, source } = data;

  return (
    <section>
      <div
        className={`container mx-auto justify-center ${
          isBlogQuote ? "py-2" : "sm:py-8 lg:py-12 px-2 lg:px-20"
        } `}
      >
        <div
          className={`flex text-center ${
            isBlogQuote ? "pb-0" : "pb-2 lg:pb-4 lg:px-32"
          } `}
        >
          <span
            className={
              isBlogQuote ? "text-4xl md:text-6xl" : "text-6xl md:text-9xl"
            }
          >
            “
          </span>
          <p
            className={`${
              isBlogQuote ? "text-lg" : "text-lg md:text-4xl"
            }text-center md:px-6  xl:text-4xl md:text-3xl italic`}
          >
            {quote}
          </p>
          <span
            className={
              isBlogQuote ? "text-4xl md:text-6xl" : "text-6xl md:text-9xl"
            }
          >
            ”
          </span>
        </div>
        <p
          className={`text-right text-lg md:text-xl lg:text-2xl ${
            isBlogQuote ? "pt-4" : "pr-12 lg:pr-36"
          }`}
        >
          <b>{author}</b>
        </p>
        {authorDescription && (
          <p
            className={`text-right ${
              isBlogQuote ? "" : "pr-12 lg:pr-36 text-md md:text-lg"
            }`}
          >
            {authorDescription}
          </p>
        )}
        {date && (
          <p
            className={`text-right text-sm ${
              isBlogQuote ? "" : "pr-12 lg:pr-36 py-2 text-sm md:text-md"
            }`}
          >
            {`${formatDate(date)}${source ? ", " + source : ""}`}
          </p>
        )}
      </div>
    </section>
  );
}
