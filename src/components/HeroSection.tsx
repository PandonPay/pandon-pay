
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  ArrowRight, 
  Shield, 
  Globe, 
  Clock,
  TrendingUp
} from "lucide-react";

const HeroSection = () => {
  const features = [
    { icon: Zap, text: "HTTP 原生支付" },
    { icon: Clock, text: "3秒内确认" },
    { icon: Shield, text: "链上安全" },
    { icon: Globe, text: "全球访问" }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent/30 to-secondary/10 py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23228B22' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full mb-6">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">基于 x402 协议的下一代支付</span>
            <Badge className="bg-secondary text-secondary-foreground">新</Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            <span className="block">重新定义</span>
            <span className="block gradient-green bg-clip-text text-transparent">
              Web3 支付
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
            通过 x402 协议实现 HTTP 原生稳定币支付，消除传统支付摩擦，
            <br className="hidden md:block" />
            让每一次交易都如发送消息般简单
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-card border border-green-primary/20 px-4 py-2 rounded-full"
                >
                  <Icon className="w-4 h-4 text-green-primary" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="x402-button text-lg px-8 py-4 h-auto">
              <Zap className="w-5 h-5 mr-2" />
              开始免费试用
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button variant="outline" className="text-lg px-8 py-4 h-auto border-green-primary/30 hover:bg-accent">
              查看演示
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-green-primary/20">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-primary mb-2">$2.4M+</div>
              <div className="text-sm text-muted-foreground">处理交易额</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-primary mb-2">1,200+</div>
              <div className="text-sm text-muted-foreground">活跃开发者</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-primary mb-2">2.8s</div>
              <div className="text-sm text-muted-foreground">平均确认时间</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-primary mb-2">45+</div>
              <div className="text-sm text-muted-foreground">支持国家</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
