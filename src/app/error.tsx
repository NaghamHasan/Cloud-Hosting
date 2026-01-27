"use client";
import Link from "next/link";

interface ErrorType {
  error: Error;
  reset(): void;
}

function error({ error, reset }: ErrorType) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-4">
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[#00d1ff] tracking-tighter mb-[-2rem]">
          404
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold main-text-color mb-4 tracking-wide uppercase">
          Something went <span className="special-text">wrong</span>
        </h2>
        <p className="text-blue-200/60 text-lg max-w-md mx-auto mb-10 first-letter:uppercase">
          {error.message}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/" className="main-btn">
            GO TO HOME PAGE
          </Link>
          <button onClick={() => reset()} className="neon-btn">
            TRY AGAIN
          </button>
        </div>
      </div>
    </div>
  );
}

export default error;
