import Image from "next/image";
import Footer from "../components/Footer/footer";
import Header from "../components/Header/Header";


export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
        <div className="auth w-full min-h-screen flex justify-center overflow-x-hidden">
          <div className="container">
            <Image
              className="relative z-3 mt-10 mx-auto md:mx-0"
              src={"/cloud hosting-logo (1).png"}
              alt={""}
              width={"200"}
              height={"200"}
            />
            <div className="w-full flex justify-center md:justify-end items-center mt-10">
              {children}
            </div>
          </div>
        </div>
  );
}
