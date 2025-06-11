import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Clock, 
  Zap,
  Code,
  ExternalLink,
  Activity,
  Plus,
  Eye,
  Copy
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import DeveloperConsole from "@/components/DeveloperConsole";
import StatsSection from "@/components/StatsSection";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USDC");
  const [network, setNetwork] = useState("base");
  const [description, setDescription] = useState("");
  const [paymentLinks, setPaymentLinks] = useState([
    {
      id: "link_1",
      amount: "25.00 USDC",
      description: "API 访问许可证",
      link: "https://pay.pandon.dev/x402/abc123",
      status: "active",
      created: "2小时前"
    },
    {
      id: "link_2",
      amount: "10.50 USDC", 
      description: "Premium 订阅",
      link: "https://pay.pandon.dev/x402/def456",
      status: "active",
      created: "1天前"
    }
  ]);
  
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleCreatePayment = () => {
    if (!amount || !currency || !network) {
      toast({
        title: "请填写必填字段",
        description: "金额、货币和网络都是必需的",
        variant: "destructive",
      });
      return;
    }

    const newLink = {
      id: `link_${Date.now()}`,
      amount: `${amount} ${currency}`,
      description: description || "支付链接",
      link: `https://pay.pandon.dev/x402/${Math.random().toString(36).substring(2, 15)}`,
      status: "active",
      created: "刚刚"
    };

    setPaymentLinks([newLink, ...paymentLinks]);
    setAmount("");
    setDescription("");
    
    toast({
      title: "支付链接已创建",
      description: "您的 x402 支付链接已准备就绪！",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "链接已复制",
      description: "支付链接已复制到剪贴板",
    });
  };

  const viewPaymentDetails = (linkId: string) => {
    navigate(`/receive/${linkId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            支付控制台
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="create">创建支付</TabsTrigger>
            <TabsTrigger value="payments">支付链接</TabsTrigger>
            <TabsTrigger value="transactions">交易记录</TabsTrigger>
            <TabsTrigger value="developer">开发工具</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
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

            <Card className="x402-card">
              <CardHeader>
                <CardTitle>平台统计</CardTitle>
              </CardHeader>
              <CardContent>
                <StatsSection />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create Payment Tab */}
          <TabsContent value="create" className="space-y-6">
            <Card className="x402-card">
              <CardHeader>
                <CardTitle className="flex items-center text-green-primary">
                  <Plus className="w-5 h-5 mr-2" />
                  创建支付链接
                </CardTitle>
                <CardDescription>
                  生成基于 x402 协议的支付链接
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">支付金额 *</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="10.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>稳定币类型</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USDC">USDC</SelectItem>
                        <SelectItem value="USDT">USDT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>区块链网络</Label>
                  <Select value={network} onValueChange={setNetwork}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="base">Base (推荐)</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">支付描述</Label>
                  <Input
                    id="description"
                    placeholder="API 访问许可证 - 1个月"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <Button onClick={handleCreatePayment} className="x402-button w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  生成支付链接
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Links Tab */}
          <TabsContent value="payments" className="space-y-6">
            <Card className="x402-card">
              <CardHeader>
                <CardTitle>我的支付链接</CardTitle>
                <CardDescription>
                  管理您创建的所有支付链接
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentLinks.map((link) => (
                    <div key={link.id} className="flex items-center justify-between p-4 border border-green-primary/20 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{link.amount}</p>
                          <p className="text-sm text-muted-foreground">{link.description}</p>
                          <p className="text-xs text-muted-foreground">创建于 {link.created}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-600 text-white">
                          {link.status === "active" ? "活跃" : "已过期"}
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(link.link)}>
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => viewPaymentDetails(link.id)}>
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
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
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
