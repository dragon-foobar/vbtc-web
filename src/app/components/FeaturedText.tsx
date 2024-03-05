"use client";

import HighlightedText from "./HighlightedText";

interface FeaturedTextProps {
  data: {
    text: string;
    heading?: string;
  };
}

export default function FeatureText({ data }: FeaturedTextProps) {
  const { text, heading } = data;

  return (
    <section>
      <div className="container flex mx-auto sm:py-8 lg:py-20 xl:px-60 justify-center">
        <div className="p-6 text-center lg:w-3/4 xl:w-2/3">
          {heading && (
            <HighlightedText
              text={heading}
              tag="h2"
              className="text-4xl font-bold leading-none sm:text-5xl mt-8 lg:mt-0 mb-8"
            />
          )}
          <p className="mb-8 text-xl md:text-xl lg:text-xl sm:mb-12 text-ellipsis overflow-hidden md:leading-loose leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}
