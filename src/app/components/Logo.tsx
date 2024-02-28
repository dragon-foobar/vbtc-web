import Link from "next/link";
import Image from "next/image";

export default function Logo({
  src,
  children,
}: {
  src: string | null;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href="/"
      aria-label="Back to homepage"
      className="flex items-center p-2 "
    >
      {src && (
        <Image
          src={src}
          alt="logo"
          width={65}
          height={65}
          className="rounded-full bg-black p-2"
        />
      )}
      <div className="ml-2">{children}</div>
    </Link>
  );
}