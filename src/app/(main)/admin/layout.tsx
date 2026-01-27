import NavBar from "../../components/Admin/navBar";
import { VerifyTokenPages } from "@/utils/verifyToken";
import { JwtPaload } from "@/utils/types";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout = async ({ children }: LayoutProps) => {
  const payload = await VerifyTokenPages() as JwtPaload || undefined;
  if(!payload || !payload?.isAdmin) redirect("/")
  return (
    <div className="flex relative">
        <NavBar />
      <div className="flex-1 pl-15 md:pl-60">{children}</div>
    </div>
  );
};

export default AdminLayout;
