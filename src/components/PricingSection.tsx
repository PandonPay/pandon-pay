import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, Star, Crown } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "免费版",
      price: "$0",
      period: "/月",
      description: "适合个人开发者和小型项目",
      features: [
        "每月 1,000 次交易",
        "基础 SDK 支持",
        "社区技术支持",
        "标准 API 文档",
        "基础分析报告",
      ],
      limitations: ["单个钱包连接", "标准确认速度"],
      buttonText: "免费开始",
      buttonVariant: "outline" as const,
      icon: Zap,
      badge: null,
    },
    {
      name: "专业版",
      price: "$299",
      period: "/月",
      description: "适合成长型企业和专业团队",
      features: [
        "每月 50,000 次交易",
        "完整 SDK 功能",
        "优先技术支持",
        "高级 API 文档",
        "详细分析报告",
        "多钱包管理",
        "自定义回调",
        "批量交易支持",
      ],
      limitations: [],
      buttonText: "选择专业版",
      buttonVariant: "default" as const,
      icon: Star,
      badge: "推荐",
      badgeColor: "bg-secondary/20 text-secondary-foreground",
    },
    {
      name: "企业版",
      price: "$999",
      period: "/月",
      description: "适合大型企业和高频交易场景",
      features: [
        "无限制交易次数",
        "企业级 SDK",
        "7x24 专属支持",
        "定制化集成",
        "实时数据分析",
        "多团队管理",
        "白标解决方案",
        "专属客户经理",
        "SLA 保证",
      ],
      limitations: [],
      buttonText: "联系销售",
      buttonVariant: "default" as const,
      icon: Crown,
      badge: "企业首选",
      badgeColor: "bg-orange-100 text-orange-700",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-secondary/20 text-secondary-foreground mb-4">
            定价方案
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            选择适合您的方案
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            从免费版开始，随着业务增长升级到更高级的方案，享受更多功能和更好的支持
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isPopular = plan.badge === "推荐";

            return (
              <Card
                key={index}
                className={`relative ${
                  isPopular
                    ? "border-green-primary/40 shadow-xl scale-105"
                    : "border-green-primary/20"
                } hover:shadow-lg transition-all duration-300`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className={plan.badgeColor}>{plan.badge}</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        {plan.period}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Button
                    variant={plan.buttonVariant}
                    className={`w-full ${
                      plan.buttonVariant === "default"
                        ? "x402-button"
                        : "border-green-primary/30 hover:bg-accent"
                    }`}
                  >
                    {plan.buttonText}
                  </Button>

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">
                      包含功能：
                    </p>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}

                    {plan.limitations.length > 0 && (
                      <>
                        <p className="text-sm font-medium text-muted-foreground mt-4">
                          限制条件：
                        </p>
                        {plan.limitations.map((limitation, i) => (
                          <div key={i} className="flex items-start space-x-3">
                            <div className="w-4 h-4 border border-muted-foreground rounded-full mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {limitation}
                            </span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ or additional info */}
        <div className="text-center mt-16 pt-8 border-t border-green-primary/20">
          <p className="text-muted-foreground mb-4">
            所有方案都包含：手续费仅 0.3% • 24/7 系统监控 • 企业级安全保障
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-muted-foreground">
            <span>• 无隐藏费用</span>
            <span>• 随时可以升级或降级</span>
            <span>• 30天无理由退款</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
