"use client";

import Link from "next/link";
import Image from "next/image";
import HighlightedText from "./HighlightedText";
import { getStrapiMedia } from "../utils/api-helpers";
import { renderButtonStyle } from "../utils/render-button-style";
import { useTheme } from "next-themes";

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

interface HeroProps {
  data: {
    id: string;
    title: string;
    description: string;
    lightModePicture: Picture;
    buttons: Button[];
    darkModePicture: Picture;
  };
}

export default function Hero({ data }: HeroProps) {
  const { theme } = useTheme();
  const imgUrl =
    theme === "dark"
      ? getStrapiMedia(data.darkModePicture.data.attributes.url)
      : getStrapiMedia(data.lightModePicture.data.attributes.url);
  return (
    <section>
      <div className="container flex flex-col justify-center mx-auto py-0 md:py-6 lg:px-6 lg:flex-row lg:justify-between xl:px-40">
        <div className="flex items-center justify-center p-2 lg:mt-0 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 md:w-100 lg:mx-0 w-2/3 mx-auto">
          <Image
            src={imgUrl || ""}
            alt={
              data.lightModePicture.data.attributes.alternativeText ||
              "none provided"
            }
            className="object-cover rounded-2xl"
            width={600}
            height={600}
          />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-2 md:py-12 md:px-20 lg:pl-20 lg:pr-0 text-center rounded-lg lg:max-w-lg xl:max-w-lg lg:text-left">
          <HighlightedText
            text={data.title}
            tag="h1"
            className="text-4xl font-bold leading-none sm:text-6xl my-2 lg:mt-0"
          />

          <HighlightedText
            text={data.description}
            tag="p"
            className="tmt-6 mb-8 mt-2 text-lg sm:mb-12"
            color="dark:text-white"
          />
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            {data.buttons.map((button: Button, index: number) => (
              <Link
                key={index}
                href={button.url}
                target={button.newTab ? "_blank" : "_self"}
                className={renderButtonStyle(button.type)}
              >
                {button.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
