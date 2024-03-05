import { Metadata } from "next";

export default function layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog | Victorian Bitcoin Technology Club",
  };
}
