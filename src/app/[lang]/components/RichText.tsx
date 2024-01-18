import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextProps {
  data: {
    content: string;
  };
}

export default function RichText({ data }: RichTextProps) {
  // TODO: STYLE THE MARKDOWN
  return (
    <section className="rich-text py-6 container mx-auto lg:px-96 px-5 sm:px-32">
      <Markdown children={data.content} remarkPlugins={[remarkGfm]} />
    </section>
  );
}
