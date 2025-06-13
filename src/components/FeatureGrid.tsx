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
  Forward,
  Send,
  FileText,
  Route,
  Shield,
  Globe,
  Code,
  TrendingUp,
  Clock,
  Cpu,
  Wallet,
  CheckCircle,
} from "lucide-react";

const FeatureGrid = () => {
  const features = [
    {
      icon: Route,
      title: "HTTP 原生支付",
      description: "基于 x402 协议，将支付直接嵌入到 HTTP 请求中，无需页面跳转",
      badge: "核心技术",
      badgeColor: "bg-green-100 text-green-700",
    },
    {
      icon: Clock,
      title: "极速结算",
      description: "Layer 2 优化，支付确认时间 ≤ 3 秒，TPS 支持 200+ 并发处理",
      badge: "性能优势",
      badgeColor: "bg-blue-100 text-blue-700",
    },
    {
      icon: Code,
      title: "一行代码集成",
      description: "服务器端仅需 1 行代码，客户端自动处理，最简集成体验",
      badge: "开发友好",
      badgeColor: "bg-purple-100 text-purple-700",
    },
    {
      icon: Shield,
      title: "安全可信",
      description: "链上交易验证，智能合约审计，支付凭证防篡改加密传输",
      badge: "企业级",
      badgeColor: "bg-orange-100 text-orange-700",
    },
    {
      icon: Globe,
      title: "全球访问",
      description: "无需银行账户，钱包即可交易，支持全球范围即时跨境支付",
      badge: "无边界",
      badgeColor: "bg-teal-100 text-teal-700",
    },
    {
      icon: Cpu,
      title: "AI 代理友好",
      description: "支持 AI 代理自动化支付，适配 Hyperbolic AI 等智能系统",
      badge: "未来科技",
      badgeColor: "bg-indigo-100 text-indigo-700",
    },
    {
      icon: TrendingUp,
      title: "低成本高效",
      description: "手续费仅 0.3%，无退款风险，减少传统支付系统的中介成本",
      badge: "经济高效",
      badgeColor: "bg-emerald-100 text-emerald-700",
    },
    {
      icon: Wallet,
      title: "多钱包支持",
      description: "兼容 MetaMask、WalletConnect 等主流钱包，支持多链稳定币",
      badge: "兼容性强",
      badgeColor: "bg-pink-100 text-pink-700",
    },
    {
      icon: CheckCircle,
      title: "即时确认",
      description: "链上交易即最终结算，无需等待银行处理，实现真正的即时支付",
      badge: "实时体验",
      badgeColor: "bg-cyan-100 text-cyan-700",
    },
  ];

  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            为什么选择 x402 协议？
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            革命性的支付基础设施，解决传统支付系统的痛点，为 Web3 时代量身打造
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg group"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge
                      className={`${feature.badgeColor} text-xs font-medium`}
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-green-900 mb-4">
              准备体验下一代支付技术？
            </h3>
            <p className="text-green-700 mb-6 max-w-2xl mx-auto">
              加入全球数千家企业，开始使用 x402
              协议简化您的支付流程，提升用户体验
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                开始免费试用
              </button>
              <button className="border border-green-300 text-green-700 hover:bg-green-50 px-8 py-3 rounded-lg font-semibold transition-colors">
                预约产品演示
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default FeatureGrid;
