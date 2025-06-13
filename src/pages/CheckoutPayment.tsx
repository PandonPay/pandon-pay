import { useState } from "react";
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
} from "lucide-react";
import { Footer } from "@/components/Footer";

const CheckoutPayment = () => {
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "processing" | "completed" | "failed"
  >("pending");
  const [walletConnected, setWalletConnected] = useState(false);
  const [paymentAmount] = useState("10.50");
  const [currency] = useState("USDC");

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

  const mockPaymentLink = "https://pandon.pay/checkout/abc123";
  const mockTxHash = "0x1234...5678";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 gradient-green rounded-lg flex items-center justify-center mr-3">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-green-primary">结账支付</h1>
          </div>
          <p className="text-muted-foreground">
            基于 x402 协议的即时稳定币支付
          </p>
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
            <CardDescription>请确认支付信息并连接钱包完成交易</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-4 border-b">
              <span className="text-muted-foreground">支付金额</span>
              <span className="text-2xl font-bold text-green-primary">
                {paymentAmount} {currency}
              </span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-link">支付链接</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="payment-link"
                  value={mockPaymentLink}
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

export default CheckoutPayment;
