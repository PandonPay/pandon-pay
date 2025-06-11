import { TrendingUp, Users, Zap, Globe } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: "$2.4M+",
      label: "已处理交易额",
      description: "累计稳定币支付金额",
    },
    {
      icon: Users,
      value: "1,200+",
      label: "活跃开发者",
      description: "正在使用 x402 SDK",
    },
    {
      icon: Zap,
      value: "2.8s",
      label: "平均确认时间",
      description: "链上支付验证速度",
    },
    {
      icon: Globe,
      value: "45+",
      label: "支持国家",
      description: "全球覆盖范围",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="text-center group">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
              <Icon className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm font-semibold text-gray-700 mb-1">
              {stat.label}
            </div>
            <div className="text-xs text-gray-500">{stat.description}</div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsSection;
