import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextProps {
  content: string;
  markdownClass: string;
}

export default function RichText({ content, markdownClass }: RichTextProps) {
  return (
    <section
      className={`${markdownClass} py-6 container ${
        markdownClass === "rich-text" ? "lg:w-1/2 md:w-2/3 p-4" : "mx-auto"
      } mx-auto flex flex-col justify-center`}
    >
      <Markdown children={content} remarkPlugins={[remarkGfm]} />
    </section>
  );
}
