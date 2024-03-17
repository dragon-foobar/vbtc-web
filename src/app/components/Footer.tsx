"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import { FaXTwitter } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import { MdOutlineEmail } from "react-icons/md";
import { FaDiscord, FaLinkedin } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";
import { DonationWidget } from "./DonationWiget";
import { MdInfo } from "react-icons/md";

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
    case "TWITTER":
      return <FaXTwitter size={20} />;
    // case "YOUTUBE":
    //   return <AiFillYoutube />;
    case "LINKEDIN":
      return <FaLinkedin size={20} />;
    case "MAIL":
      return <MdOutlineEmail size={20} />;
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
      <div className="container px-6 mx-auto space-y-6 divide-y divide-secondary md:space-y-12 divide-opacity-50">
        <div className="grid grid-cols-12">
          <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
            <Logo src={logoUrl}>
              {logoText && (
                <h2 className="text-lg md:text-xl font-bold">{logoText}</h2>
              )}
            </Logo>
          </div>

          <div className="pb-6 md:pb-0 col-span-12 text-left md:col-span-2">
            <p className="pb-1 text-xl md:text-lg font-medium">Categories</p>
            <ul>
              {categoryLinks.map((link: CategoryLink) => (
                <CategoryLink key={link.id} {...link} />
              ))}
            </ul>
          </div>

          <div className="pb-6 md:pb-0 col-span-12 text-left md:col-span-2">
            <p className="pb-1 text-xl md:text-lg font-medium">Menu</p>
            <ul>
              {menuLinks.map((link: FooterLink) => (
                <FooterLink key={link.id} {...link} />
              ))}
            </ul>
          </div>

          <div className="pb-6 md:pb-0 col-span-full text-left md:col-span-2 bg-white dark:bg-black dark:md:bg-transparent rounded-md p-2 shadow-lg md:shadow-none md:bg-transparent">
            <p className="pb-6 text-xl font-bold text-center">
              Support our activities in Victoria with{" "}
              <span className="underline decoration-secondary decoration-solid">
                satoshis
              </span>
              {"  "}
              {/* <button
                className="tooltip group relative"
                data-tooltip="Hello, World!"
              >
                <MdInfo />
                <div className="tooltip-content invisible">
                  A satoshi is a very small piece of bitcoin
                </div>
              </button> */}
            </p>
            <DonationWidget />
          </div>
        </div>
        <div className="pt-6">
          <div className="flex w-full justify-between">
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
            <ul className="flex flex-col sm:flex-row">
              {legalLinks.map((link: FooterLink) => (
                <Link href={link.url} className="mr-4 text-right" key={link.id}>
                  {link.text}
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
            {socialLinks.map((link: FooterLink) => {
              return (
                <a
                  key={link.id}
                  rel="noopener noreferrer"
                  href={link.url}
                  title={link.text}
                  target={link.newTab ? "_blank" : "_self"}
                  className="flex items-center justify-center w-20 h-20 rounded-full"
                >
                  <RenderSocialIcon social={link.social} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
