import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Copy,
  Shield,
  CreditCard,
  QrCode,
  Check,
  Link as LinkIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/hooks/useWallet";
import Navigation from "@/components/Navigation";
import DeveloperConsole from "@/components/DeveloperConsole";
import StatsSection from "@/components/StatsSection";
import { Footer } from "@/components/Footer";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Dashboard = () => {
  const { address, balance } = useWallet();
  const [timeRange, setTimeRange] = useState("7d");
  const [expiryDays, setExpiryDays] = useState("7");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USDC");
  const [network, setNetwork] = useState("base");
  const [description, setDescription] = useState("");
  const [paymentLinks, setPaymentLinks] = useState([
    {
      id: "link_1",
      amount: "25.00 USDC",
      description: "API 访问许可证",
      link: "https://pandon.pay/checkout/abc123",
      status: "active",
      created: "2小时前",
    },
    {
      id: "link_2",
      amount: "10.50 USDC",
      description: "Premium 订阅",
      link: "https://pandon.pay/checkout/def456",
      status: "active",
      created: "1天前",
    },
  ]);

  const navigate = useNavigate();
  const { toast } = useToast();

  const currencies = [
    { value: "USDC", label: "USDC", icon: "💵" },
    { value: "USDT", label: "USDT", icon: "💰" },
  ];

  const networks = [
    { value: "base", label: "Base (推荐)", fee: "0.001 USDC", speed: "2-3秒" },
    { value: "polygon", label: "Polygon", fee: "0.002 USDC", speed: "3-5秒" },
    { value: "ethereum", label: "Ethereum", fee: "2-5 USDC", speed: "30-60秒" },
  ];

  const metrics = [
    {
      title: "钱包总资产",
      value: `${balance} ETH`,
      change: "+2.4%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "当前钱包余额",
    },
    {
      title: "总交易额",
      value: "$12,847",
      change: "+18.2%",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "累计支付收入",
    },
    {
      title: "成功支付",
      value: "234",
      change: "+12.5%",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "活跃用户",
      value: "89",
      change: "+8.1%",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      description: "成功交易次数",
    },
    {
      title: "平均确认时间",
      value: "2.3s",
      change: "-0.4s",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      description: "交易确认速度",
    },
  ];

  const recentTransactions = [
    {
      id: "tx_1",
      amount: "25.00 USDC",
      status: "成功",
      time: "2分钟前",
      network: "Base",
      hash: "0x1a2b...4c5d",
    },
    {
      id: "tx_2",
      amount: "10.50 USDC",
      status: "成功",
      time: "15分钟前",
      network: "Polygon",
      hash: "0x6e7f...8g9h",
    },
    {
      id: "tx_3",
      amount: "50.00 USDT",
      status: "处理中",
      time: "1小时前",
      network: "Base",
      hash: "0xabcd...efgh",
    },
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
      link: `https://pandon.pay/checkout/${Math.random().toString(36).substring(2, 15)}`,
      status: "active",
      created: "刚刚",
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
    // 在新标签页中打开支付详情页面
    window.open(`/checkout/${linkId}`, "_blank");
  };

  const estimatedFee =
    networks.find((n) => n.value === network)?.fee || "0.001 USDC";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">控制台</h1>
          <div className="flex items-center space-x-4">
            <p className="text-lg text-muted-foreground">
              管理您的 x402 支付集成和监控交易数据
            </p>
            {address && (
              <Badge
                variant="outline"
                className="bg-green-primary/10 text-green-primary border-green-primary/30"
              >
                钱包: {address.slice(0, 6)}...{address.slice(-4)}
              </Badge>
            )}
          </div>
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
                      <p className="text-xs text-muted-foreground mt-1">
                        {metric.description}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}
                    >
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="create">创建支付</TabsTrigger>
            <TabsTrigger value="payments">支付链接</TabsTrigger>
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
          {/* Create Payment Tab */}
          <TabsContent value="create" className="space-y-6">
            <Card className="x402-card">
              <CardHeader>
                <CardTitle className="flex items-center text-green-primary">
                  <Plus className="w-5 h-5 mr-2" />
                  创建支付链接
                </CardTitle>
                <CardDescription>生成基于 x402 协议的支付链接</CardDescription>
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
                    <Label>稳定币类型 *</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((curr) => (
                          <SelectItem key={curr.value} value={curr.value}>
                            <div className="flex items-center space-x-2">
                              <span>{curr.icon}</span>
                              <span>{curr.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>区块链网络 *</Label>
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
                    <Label>接收地址 *</Label>
                    <Input
                      value={address || ""}
                      disabled
                      className="bg-muted text-muted-foreground"
                      placeholder="请先连接钱包"
                    />
                    <p className="text-xs text-muted-foreground">
                      资金将发送到您连接的钱包地址
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">支付信息</Label>
                    <Input
                      id="description"
                      placeholder="API 访问许可证 - 1个月"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>链接有效期</Label>
                    <Select value={expiryDays} onValueChange={setExpiryDays}>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择有效期" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1h">1小时</SelectItem>
                          <SelectItem value="24h">24小时</SelectItem>
                          <SelectItem value="7d">7天</SelectItem>
                          <SelectItem value="30d">30天</SelectItem>
                          <SelectItem value="never">永久有效</SelectItem>
                        </SelectContent>
                      </Select>
                    </Select>
                  </div>
                </div>

                {/* Fee Estimation */}
                <Alert className="border-green-primary/30 bg-accent">
                  <Shield className="h-4 w-4 text-green-primary" />
                  <AlertDescription>
                    <div className="flex justify-between items-center">
                      <span>预估手续费: {estimatedFee}</span>
                      <Badge className="bg-green-primary/20 text-green-primary">
                        低费用
                      </Badge>
                    </div>
                  </AlertDescription>
                </Alert>

                <Button
                  onClick={handleCreatePayment}
                  className="x402-button w-full"
                >
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
                <CardDescription>管理您创建的所有支付链接</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentLinks.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center justify-between p-4 border border-green-primary/20 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{link.amount}</p>
                          <p className="text-sm text-muted-foreground">
                            {link.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            创建于 {link.created}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-600 text-white">
                          {link.status === "active" ? "活跃" : "已过期"}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(link.link)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewPaymentDetails(link.id)}
                        >
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
                <CardDescription>您最近的 x402 支付交易记录</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 border border-green-primary/20 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{tx.amount}</p>
                          <p className="text-sm text-muted-foreground">
                            {tx.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={
                              tx.status === "成功"
                                ? "bg-green-600 text-white"
                                : "bg-yellow-500 text-white"
                            }
                          >
                            {tx.status}
                          </Badge>
                          <Badge variant="outline">{tx.network}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <code className="text-xs text-muted-foreground">
                            {tx.hash}
                          </code>
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
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
