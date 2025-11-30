import Navbar from "@/components/dashboard/Navbar";
import WelcomeSection from "@/components/dashboard/WeclomeSection";
import MainActions from "@/components/dashboard/MainActions";
import ActivityOverview from "@/components/dashboard/ActivityOverview";

const DashboardPage = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <WelcomeSection />
        <MainActions />
        <ActivityOverview />
      </div>
    </div>
  );
};

export default DashboardPage;
