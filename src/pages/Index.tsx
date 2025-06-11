
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/hooks/useWallet";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureGrid from "@/components/FeatureGrid";
import StatsSection from "@/components/StatsSection";

const Index = () => {
  const navigate = useNavigate();
  const { isConnected, isConnecting, connectWallet } = useWallet();

  const handleStartTrial = async () => {
    if (!isConnected) {
      await connectWallet();
    }
    // 连接钱包后跳转到 dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      
      {/* 修改 CTA 按钮 */}
      <div className="text-center py-16">
        <Button
          onClick={handleStartTrial}
          disabled={isConnecting}
          className="x402-button text-lg px-8 py-6"
        >
          {isConnecting ? (
            <>
              <div className="w-5 h-5 mr-2 animate-spin border-2 border-white border-t-transparent rounded-full" />
              连接钱包中...
            </>
          ) : isConnected ? (
            <>
              进入控制台
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          ) : (
            <>
              <Wallet className="w-5 h-5 mr-2" />
              开始试用
            </>
          )}
        </Button>
      </div>

      <FeatureGrid />
      <StatsSection />
    </div>
  );
};

export default Index;
