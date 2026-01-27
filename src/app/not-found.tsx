import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      <div className="relative z-10 text-center px-4">
        {/* كود الخطأ بتدرج لوني */}
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[#00d1ff] leading-none">
          404
        </h1>
        {/* الرسالة الأساسية بنفس ستايل صورك */}
        <h2 className="mt-4 text-3xl md:text-5xl font-bold main-text-color tracking-wider uppercase">
          Something went wrong
        </h2>
        <p className="mt-6 second-text-color text-lg max-w-md mx-auto">
          We're sorry, we couldn't load the requested page. Please try again or return home.
        </p>
         <div className="mt-10">
          <Link
            href="/"
            className="neon-btn"
          >
            Go to Home Page
          </Link>
        </div>
      </div>
      </div>)}
