import Navbar from "@/components/dashboard/Navbar";
import ProPlanRequired from "@/components/pro/ProPlanRequired";
import FeatureCards from "@/components/voice/FeatureCards";
import WelcomeSection from "@/components/voice/WelcomeSection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import VapiWidget from "@/components/voice/VapiWidget";

const VoicePage = async () => {
  const user = await currentUser();
  // to check if he has a pro plan
  const { has } = await auth();

  if (!user) redirect("/");

  const isPro = has({ plan: "ai_basic" }) || has({ plan: "ai_pro" });

  if (!isPro) return <ProPlanRequired />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <WelcomeSection />
        <FeatureCards />
      </div>
      <VapiWidget />
    </div>
  );
};

export default VoicePage;
