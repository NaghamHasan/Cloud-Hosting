import Image from "next/image";
import React from "react";
import { FooterData } from "./footerData";

const Footer = () => {
  return (
    <footer className="relative z-10 black-bg border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 text-center sm:text-start sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 flex flex-col items-center sm:items-start">
              <Image
                src={"/cloud hosting-logo (1).png"}
                width={"200"}
                height={"200"}
                alt=""
              />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {FooterData.description}
            </p>
          </div>
          {/* 3. توزيع روابط الأقسام تلقائياً */}
          {FooterData.sections.map((section) => (
            <div className="flex flex-col items-center sm:items-start" key={section.title}>
              <h4 className="text-white font-semibold mb-6 tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-4 text-sm text-gray-400">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link}`}
                      className="hover:text-[#00D1FF] hover:translate-x-1 inline-block transition-all duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* 4. السطر السفلي (Bottom Bar) */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs">{FooterData.copyright}</p>

          <div className="flex gap-8 text-sm">
            {FooterData.socials.map((link, key) => (
              <a
                key={key}
                href={link.url}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}{" "}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
