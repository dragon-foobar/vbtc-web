"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import { CgWebsite } from "react-icons/cg";
import { MdOutlineEmail } from "react-icons/md";
import { FaDiscord, FaLinkedin } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";
import { ReactBtcPayButton } from "./DonationWiget";

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

interface CategoryLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}

function FooterLink({ url, text }: FooterLink) {
  const path = usePathname();
  return (
    <li className="flex">
      <Link
        href={url}
        className={`hover:dark:text-white ${
          path === url && "dark:text-white dark:border-white"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function CategoryLink({ attributes }: CategoryLink) {
  return (
    <li className="flex">
      <Link href={`/blog/${attributes.slug}`} className="hover:dark:text-white">
        {attributes.name}
      </Link>
    </li>
  );
}

function RenderSocialIcon({ social }: { social: string | undefined }) {
  switch (social) {
    case "WEBSITE":
      return <CgWebsite />;
    case "TWITTER":
      return <AiFillTwitterCircle />;
    case "YOUTUBE":
      return <AiFillYoutube />;
    case "DISCORD":
      return <FaDiscord />;
    case "LINKEDIN":
      return <FaLinkedin />;
    case "MAIL":
      return <MdOutlineEmail />;
    default:
      return null;
  }
}

export default function Footer({
  logoUrl,
  logoText,
  menuLinks,
  categoryLinks,
  legalLinks,
  socialLinks,
}: {
  logoUrl: string | null;
  logoText: string | null;
  menuLinks: Array<FooterLink>;
  categoryLinks: Array<CategoryLink>;
  legalLinks: Array<FooterLink>;
  socialLinks: Array<FooterLink>;
}) {
  const btcpayUrl = process.env.NEXT_PUBLIC_BTCPAY_URL;
  const btcpayStoreId = process.env.NEXT_PUBLIC_BTCPAY_STORE_ID;
  return (
    <footer className="py-6">
      <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
        <div className="grid grid-cols-12">
          <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
            <Logo src={logoUrl}>
              {logoText && (
                <h2 className="text-lg md:text-xl font-bold">{logoText}</h2>
              )}
            </Logo>
          </div>

          <div className="pb-6 md:pb-0 col-span-6 text-left md:col-span-2">
            <p className="pb-1 text-lg font-medium">Categories</p>
            <ul>
              {categoryLinks.map((link: CategoryLink) => (
                <CategoryLink key={link.id} {...link} />
              ))}
            </ul>
          </div>

          <div className="pb-6 md:pb-0 col-span-6 text-left md:col-span-2">
            <p className="pb-1 text-lg font-medium">Menu</p>
            <ul>
              {menuLinks.map((link: FooterLink) => (
                <FooterLink key={link.id} {...link} />
              ))}
            </ul>
          </div>

          <div className="pb-6 md:pb-0 col-span-full text-left md:col-span-2">
            <p className="pb-1 text-lg font-medium text-center">Support us</p>
            <ReactBtcPayButton />
          </div>
        </div>
        <div className="grid justify-center pt-6 lg:justify-between">
          <div className="flex">
            <span className="mr-4">
              ©{new Date().getFullYear()} No rights reserved. Fork code{" "}
              <Link
                target="_blank"
                href="https://github.com/dragon-foobar/vbtc-web"
                className="hover:text-secondary underline"
              >
                here
              </Link>
              .
            </span>
            <ul className="flex">
              {legalLinks.map((link: FooterLink) => (
                <Link href={link.url} className="mr-4" key={link.id}>
                  {link.text}
                </Link>
              ))}
            </ul>
          </div>
          {/* <div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
            {socialLinks.map((link: FooterLink) => {
              return (
                <a
                  key={link.id}
                  rel="noopener noreferrer"
                  href={link.url}
                  title={link.text}
                  target={link.newTab ? "_blank" : "_self"}
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                >
                  <RenderSocialIcon social={link.social} />
                </a>
              );
            })}
          </div> */}
        </div>
      </div>
    </footer>
  );
}
