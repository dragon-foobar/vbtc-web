import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Email from "../components/Email";
import RichText from "../components/RichText";
import Quote from "../components/Quote";
import FeaturedText from "../components/FeaturedText";

export function sectionRenderer(section: any, index: number) {
  switch (section.__component) {
    case "sections.hero":
      return <Hero key={index} data={section} />;
    case "sections.features":
      return <Features key={index} data={section} />;
    case "sections.rich-text":
      return (
        <RichText
          key={index}
          content={section.content}
          markdownClass="rich-text"
        />
      );
    case "sections.testimonials-group":
      return <Testimonials key={index} data={section} />;
    case "sections.pricing":
      return <Pricing key={index} data={section} />;
    case "sections.lead-form":
      return <Email key={index} data={section} />;
    case "sections.quote":
      return <Quote key={index} data={section} isBlogQuote={false} />;
    case "sections.featured-text-block":
      return <FeaturedText key={index} data={section} />;
    default:
      return null;
  }
}
