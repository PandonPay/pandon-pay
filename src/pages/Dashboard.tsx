
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Clock, 
  Zap,
  Code,
  ExternalLink,
  Activity
} from "lucide-react";
import Navigation from "@/components/Navigation";
import DeveloperConsole from "@/components/DeveloperConsole";
import StatsSection from "@/components/StatsSection";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");

  const metrics = [
    {
      title: "总交易额",
      value: "$12,847",
      change: "+18.2%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "成功支付",
      value: "234",
      change: "+12.5%",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "活跃用户",
      value: "89",
      change: "+8.1%",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "平均确认时间",
      value: "2.3s",
      change: "-0.4s",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  const recentTransactions = [
    {
      id: "tx_1",
      amount: "25.00 USDC",
      status: "成功",
      time: "2分钟前",
      network: "Base",
      hash: "0x1a2b...4c5d"
    },
    {
      id: "tx_2", 
      amount: "10.50 USDC",
      status: "成功",
      time: "15分钟前",
      network: "Polygon",
      hash: "0x6e7f...8g9h"
    },
    {
      id: "tx_3",
      amount: "50.00 USDT",
      status: "处理中",
      time: "1小时前",
      network: "Base",
      hash: "0xabcd...efgh"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            开发者控制台
          </h1>
          <p className="text-lg text-muted-foreground">
            管理您的 x402 支付集成和监控交易数据
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="x402-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {metric.title}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {metric.value}
                      </p>
                      <p className={`text-sm ${metric.color}`}>
                        {metric.change}
                      </p>
                    </div>
                    <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="transactions">交易记录</TabsTrigger>
            <TabsTrigger value="developer">开发工具</TabsTrigger>
            <TabsTrigger value="analytics">数据分析</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card className="x402-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-primary">
                    <Zap className="w-5 h-5 mr-2" />
                    快速操作
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="x402-button w-full justify-start">
                    <DollarSign className="w-4 h-4 mr-2" />
                    创建新支付链接
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Code className="w-4 h-4 mr-2" />
                    查看集成文档
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    下载交易报告
                  </Button>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card className="x402-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-primary">
                    <Activity className="w-5 h-5 mr-2" />
                    系统状态
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">x402 协议</span>
                    <Badge className="bg-green-600 text-white">运行正常</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Base 网络</span>
                    <Badge className="bg-green-600 text-white">运行正常</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">支付处理</span>
                    <Badge className="bg-green-600 text-white">运行正常</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API 服务</span>
                    <Badge className="bg-yellow-500 text-white">部分降级</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats Section */}
            <Card className="x402-card">
              <CardHeader>
                <CardTitle>平台统计</CardTitle>
              </CardHeader>
              <CardContent>
                <StatsSection />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card className="x402-card">
              <CardHeader>
                <CardTitle>最近交易</CardTitle>
                <CardDescription>
                  您最近的 x402 支付交易记录
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 border border-green-primary/20 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{tx.amount}</p>
                          <p className="text-sm text-muted-foreground">{tx.time}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center space-x-2">
                          <Badge className={tx.status === "成功" ? "bg-green-600 text-white" : "bg-yellow-500 text-white"}>
                            {tx.status}
                          </Badge>
                          <Badge variant="outline">{tx.network}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <code className="text-xs text-muted-foreground">{tx.hash}</code>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Developer Tab */}
          <TabsContent value="developer" className="space-y-6">
            <DeveloperConsole />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="x402-card">
              <CardHeader>
                <CardTitle>数据分析</CardTitle>
                <CardDescription>
                  深入了解您的支付数据和用户行为
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">
                    分析功能即将推出
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    我们正在开发强大的分析工具来帮助您更好地理解支付数据
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
