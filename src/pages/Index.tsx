import { useNavigate } from "react-router-dom";
import { useWallet } from "@/hooks/useWallet";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureGrid from "@/components/FeatureGrid";
import StatsSection from "@/components/StatsSection";
import PaymentReceiver from "@/components/PaymentReceiver";
import PricingSection from "@/components/PricingSection";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  ArrowRight,
  Code,
  Shield,
  Globe,
  CheckCircle,
  Star,
} from "lucide-react";
import { Footer } from "@/components/Footer";

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

  const testimonials = [
    {
      name: "Eric Wang",
      role: "CTO, TechFlow",
      content:
        "x402 协议让我们的 API 货币化变得极其简单，从集成到收款只用了不到一天时间。",
      rating: 5,
    },
    {
      name: "Molly Mao",
      role: "产品经理, DataSync",
      content: "终于有了真正无摩擦的支付解决方案，用户体验提升了 300%。",
      rating: 5,
    },
    {
      name: "John Doe",
      role: "独立开发者",
      content:
        "作为个人开发者，能够接收全球支付而无需复杂的银行账户设置真是太棒了。",
      rating: 5,
    },
  ];

  const useCases = [
    {
      title: "API 货币化",
      description: "按调用收费，替代传统订阅模型",
      icon: Code,
      examples: ["AI 服务", "数据接口", "云计算资源"],
    },
    {
      title: "数字内容解锁",
      description: "即时支付访问高级内容",
      icon: Shield,
      examples: ["在线课程", "专业报告", "软件功能"],
    },
    {
      title: "AI 代理支付",
      description: "自动化代理自主完成交易",
      icon: Globe,
      examples: ["GPU 租赁", "数据采购", "服务订阅"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              平台数据
            </h2>
            <p className="text-lg text-muted-foreground">
              信任 Pandon Pay 的全球用户和开发者
            </p>
          </div>
          <StatsSection />
        </div>
      </section>

      {/* Features Section */}
      <FeatureGrid />

      {/* Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-secondary/20 text-secondary-foreground mb-4">
              实时演示
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              体验 x402 支付流程
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              下面是一个真实的 x402 支付演示，展示从支付请求到资金确认的完整流程
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <PaymentReceiver />
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              应用场景
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              x402 协议适用于各种需要即时支付的现代业务场景
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <Card key={index} className="x402-card">
                  <CardHeader>
                    <div className="w-12 h-12 gradient-green rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{useCase.title}</CardTitle>
                    <CardDescription className="text-base">
                      {useCase.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground mb-3">
                        典型应用：
                      </p>
                      {useCase.examples.map((example, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-primary" />
                          <span className="text-sm">{example}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              用户反馈
            </h2>
            <p className="text-lg text-muted-foreground">
              看看开发者们如何使用 x402 协议改变他们的业务
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="x402-card">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 gradient-green rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {testimonial.name[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-accent to-secondary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            准备革新您的支付系统？
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            加入数千家企业，开始使用 x402 协议简化支付流程，提升用户体验
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleStartTrial}
              disabled={isConnecting}
              className="x402-button text-lg px-8 py-4 h-auto"
            >
              <Zap className="w-5 h-5 mr-2" />
              {isConnecting ? (
                <>
                  <div className="w-5 h-5 mr-2 animate-spin border-2 border-white border-t-transparent rounded-full" />
                  连接钱包中...
                </>
              ) : (
                <>开始试用</>
              )}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              onClick={() => (window.location.href = "/docs")}
              variant="outline"
              className="text-lg px-8 py-4 h-auto border-green-primary/30 hover:bg-accent"
            >
              <Code className="w-5 h-5 mr-2" />
              查看文档
            </Button>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            无需信用卡 • 5分钟快速集成 • 24/7 技术支持
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
