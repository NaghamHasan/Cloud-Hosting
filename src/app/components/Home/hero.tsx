import React from "react";

const Hero = () => {
  return (
    <div className="flex items-top justify-center px-10 mt-40 mb-25 text-center">
      <div className="max-w-200 text-center">
        <h1 className="font-bold main-text-color text center text-4xl tracking-tighter uppercase">
          Cloud Solutions for
          <span className="special-text"> Unstoppable Performance</span>
        </h1>
        <p className="py-5 mt-2 second-text-color">
          Deploy your apps in seconds on a lightning-fast infrastructure. Scale
          effortlessly with integrated security and 99.9% uptime guaranteed
        </p>
        <button className="neon-btn">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
