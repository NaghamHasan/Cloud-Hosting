import Footer from "../components/Footer/footer";
import Header from "../components/Header/Header";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`relative`}>
        <Header />
      <div className="main-layout">{children}</div>
      <Footer />
    </div>
  );
}
