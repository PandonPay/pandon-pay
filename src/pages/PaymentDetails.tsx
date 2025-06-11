import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import {
  Wallet,
  CheckCircle,
  Clock,
  AlertCircle,
  Copy,
  QrCode,
  ArrowRight,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { Footer } from "@/components/Footer";

const PaymentDetails = () => {
  const { linkId } = useParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "processing" | "completed" | "failed"
  >("pending");
  const [walletConnected, setWalletConnected] = useState(false);

  // 模拟支付链接数据
  const [paymentData, setPaymentData] = useState({
    amount: "10.50",
    currency: "USDC",
    description: "API 访问许可证",
    link: `https://pay.pandon.dev/x402/${linkId}`,
    network: "Base",
    created: "2小时前",
  });

  const handleConnectWallet = () => {
    setWalletConnected(true);
    setPaymentStatus("processing");
    // 模拟支付处理
    setTimeout(() => {
      setPaymentStatus("completed");
    }, 3000);
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case "pending":
        return <Clock className="w-6 h-6 text-muted-foreground" />;
      case "processing":
        return (
          <div className="w-6 h-6 animate-spin border-2 border-primary border-t-transparent rounded-full" />
        );
      case "completed":
        return <CheckCircle className="w-6 h-6 text-primary" />;
      case "failed":
        return <AlertCircle className="w-6 h-6 text-destructive" />;
    }
  };

  const getStatusText = () => {
    switch (paymentStatus) {
      case "pending":
        return "等待支付";
      case "processing":
        return "处理中...";
      case "completed":
        return "支付成功";
      case "failed":
        return "支付失败";
    }
  };

  const mockTxHash = "0x1234...5678";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* 返回按钮 */}
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回控制台
        </Button>

        {/* 页面标题 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 gradient-green rounded-lg flex items-center justify-center mr-3">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-green-primary">支付详情</h1>
          </div>
          <p className="text-muted-foreground">
            基于 x402 协议的即时稳定币支付
          </p>
          {/* <p className="text-muted-foreground">支付链接ID: {linkId}</p> */}
        </div>

        {/* 支付信息卡片 */}
        <Card className="x402-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>支付信息</span>
              <Badge variant="secondary" className="bg-secondary/20">
                x402 协议
              </Badge>
            </CardTitle>
            <CardDescription>{paymentData.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-4 border-b">
              <span className="text-muted-foreground">支付金额</span>
              <span className="text-2xl font-bold text-green-primary">
                {paymentData.amount} {paymentData.currency}
              </span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-link">支付链接</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="payment-link"
                  value={paymentData.link}
                  readOnly
                  className="bg-muted"
                />
                <Button variant="outline" size="icon">
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <QrCode className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">网络: </span>
                <Badge variant="outline">{paymentData.network}</Badge>
              </div>
              <div>
                <span className="text-muted-foreground">创建时间: </span>
                <span>{paymentData.created}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 支付状态 */}
        <Card className="x402-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getStatusIcon()}
              <span>{getStatusText()}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {paymentStatus === "pending" && (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  请连接您的钱包以开始支付流程
                </p>
                <Button
                  onClick={handleConnectWallet}
                  className="x402-button w-full"
                  disabled={walletConnected}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  连接钱包
                </Button>
              </div>
            )}

            {paymentStatus === "processing" && (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  正在处理您的支付，请稍候...
                </p>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>x402 协议自动处理中</span>
                  </div>
                </div>
              </div>
            )}

            {paymentStatus === "completed" && (
              <div className="space-y-4">
                <p className="text-green-primary font-medium">
                  支付已成功完成！
                </p>
                <div className="bg-accent rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">交易哈希</span>
                    <span className="font-mono">{mockTxHash}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">确认时间</span>
                    <span>2.3 秒</span>
                  </div>
                </div>
                <Button className="x402-button w-full">
                  查看交易详情
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* x402 协议特性 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center p-4">
            <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">即时确认</h3>
            <p className="text-sm text-muted-foreground">
              基于 Layer2 的快速结算
            </p>
          </Card>

          <Card className="text-center p-4">
            <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">安全可靠</h3>
            <p className="text-sm text-muted-foreground">
              智能合约保障资金安全
            </p>
          </Card>

          <Card className="text-center p-4">
            <Wallet className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">低手续费</h3>
            <p className="text-sm text-muted-foreground">优化的 gas 费用结构</p>
          </Card>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PaymentDetails;
