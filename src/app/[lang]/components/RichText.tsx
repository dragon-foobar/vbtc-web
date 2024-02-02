import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextProps {
  data: {
    body: string;
  };
}

export default function RichText({ data }: RichTextProps) {
  console.log("data", JSON.stringify(data));
  // TODO: STYLE THE MARKDOWN
  return (
    <section className="rich-text py-6 text-lg">
      <Markdown children={data.body} remarkPlugins={[remarkGfm]} />
    </section>
  );
}
