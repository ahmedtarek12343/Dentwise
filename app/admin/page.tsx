import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminDashboardClient from "@/components/dashboard/AdminDashboardClient";

const AdminPage = async () => {
  const user = await currentUser();
  if (!user) redirect("/?error=unauthorized");
  const adminEmail = process.env.ADMIN_EMAIL;
  if (user && user.emailAddresses?.[0].emailAddress !== adminEmail) {
    redirect("/dashboard?error=unauthorizedSignedIn");
  }
  if (!adminEmail || user.emailAddresses?.[0].emailAddress !== adminEmail) {
    redirect("/?error=unauthorized");
  }

  return <AdminDashboardClient />;
};

export default AdminPage;
