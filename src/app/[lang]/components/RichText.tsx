import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextProps {
  content: string;
}

export default function RichText({ content }: RichTextProps) {
  return (
    <section className="rich-text py-6 container mx-auto flex flex-col justify-center p-4">
      <Markdown children={content} remarkPlugins={[remarkGfm]} />
    </section>
  );
}
