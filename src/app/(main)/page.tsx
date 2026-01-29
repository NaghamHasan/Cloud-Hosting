export const dynamic = "force-dynamic";

import React from "react";
import Hero from "@/app/components/Home/hero";
import { featuresContent } from "@/utils/featuresContent";
import Feature from "@/app/components/Home/Feature";

const HomePage = () => {
  return (
    <div className="relative px-5 lg:px-0 w-full overflow-x-hidden">
      <div className="relative z-8">
        <Hero />
        <div className="flex items-center justify-center w-full my-10">
          <div className="container">
            <div className="flex flex-wrap justify-center gap-10 items-stretch">
              {featuresContent.map((el, key) => (
                <Feature
                  key={key}
                  Icon={el.icon}
                  title={el.title}
                  desc={el.desc}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
