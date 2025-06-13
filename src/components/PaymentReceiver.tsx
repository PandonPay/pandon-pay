import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Wallet,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Shield,
  Zap,
  Send,
  Forward,
  Route,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentReceiver = () => {
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "connecting" | "pending" | "success" | "failed"
  >("idle");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [transactionHash, setTransactionHash] = useState("");
  const { toast } = useToast();

  // Mock payment data
  const paymentData = {
    amount: "25.00",
    currency: "USDC",
    network: "Base",
    recipient: "0x742d...a4e7",
    description: "API 访问许可证 - 1个月",
  };

  const paymentSteps = [
    { title: "HTTP 402 响应", description: "服务器返回支付请求", icon: Route },
    { title: "钱包连接", description: "连接 Web3 钱包", icon: Wallet },
    { title: "交易签名", description: "签署稳定币转账", icon: Shield },
    { title: "链上验证", description: "区块链确认交易", icon: CheckCircle },
    { title: "资源交付", description: "获取授权访问", icon: ArrowRight },
  ];

  useEffect(() => {
    if (paymentStatus === "pending") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setPaymentStatus("success");
            setTransactionHash(
              "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
            );
            toast({
              title: "支付成功",
              description: "您的 x402 支付已完成，资源访问已开启！",
            });
            return 100;
          }

          const newStep = Math.floor((prev / 100) * paymentSteps.length);
          if (newStep !== currentStep) {
            setCurrentStep(newStep);
          }

          return prev + 2;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [paymentStatus, currentStep]);

  const handleConnectWallet = () => {
    setPaymentStatus("connecting");

    setTimeout(() => {
      setPaymentStatus("pending");
      setProgress(0);
      setCurrentStep(0);
      toast({
        title: "钱包已连接",
        description: "开始处理 x402 支付请求...",
      });
    }, 1500);
  };

  const handleReset = () => {
    setPaymentStatus("idle");
    setProgress(0);
    setCurrentStep(0);
    setTransactionHash("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="border-green-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="flex items-center text-green-800">
            <TrendingUp className="w-5 h-5 mr-2" />
            支付请求详情
          </CardTitle>
          <CardDescription className="text-green-600">
            基于 x402 协议的 HTTP 原生支付请求
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">支付金额:</span>
                <span className="font-semibold text-lg">
                  {paymentData.amount} {paymentData.currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">网络:</span>
                <Badge className="bg-blue-100 text-blue-700">
                  {paymentData.network}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">收款方:</span>
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {paymentData.recipient}
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">描述:</span>
                <span className="text-gray-900 font-medium">
                  {paymentData.description}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <Alert className="border-green-200 bg-green-50">
                <Shield className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  此支付请求通过 x402 协议验证，安全可信
                </AlertDescription>
              </Alert>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">支付优势:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 即时全球结算，无需银行账户</li>
                  <li>• 链上交易，无退款风险</li>
                  <li>• 低手续费，约 0.3% 处理费</li>
                  <li>• 支持 AI 代理自动化支付</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Wallet className="w-5 h-5 mr-2" />
              支付流程
            </span>
            {paymentStatus === "success" && (
              <Badge className="bg-green-600 text-white">
                <CheckCircle className="w-3 h-3 mr-1" />
                已完成
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {(paymentStatus === "pending" || paymentStatus === "success") && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>支付进度</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div className="space-y-4 mb-6">
            {paymentSteps.map((step, index) => {
              const isActive =
                index === currentStep && paymentStatus === "pending";
              const isCompleted =
                index < currentStep || paymentStatus === "success";
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-blue-100 border border-blue-200"
                      : isCompleted
                        ? "bg-green-100 border border-green-200"
                        : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : isCompleted
                          ? "bg-green-600 text-white"
                          : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div
                      className={`font-medium ${
                        isActive
                          ? "text-blue-900"
                          : isCompleted
                            ? "text-green-900"
                            : "text-gray-600"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div
                      className={`text-sm ${
                        isActive
                          ? "text-blue-700"
                          : isCompleted
                            ? "text-green-700"
                            : "text-gray-500"
                      }`}
                    >
                      {step.description}
                    </div>
                  </div>
                  {isCompleted && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center space-x-4">
            {paymentStatus === "idle" && (
              <Button
                onClick={handleConnectWallet}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 font-semibold"
                size="lg"
              >
                <Wallet className="w-4 h-4 mr-2" />
                连接钱包支付
              </Button>
            )}

            {paymentStatus === "connecting" && (
              <Button disabled size="lg" className="px-8 py-3">
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                连接中...
              </Button>
            )}

            {paymentStatus === "success" && (
              <div className="text-center space-y-4">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                  size="lg"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  访问资源
                </Button>
                <p className="text-sm text-gray-600">
                  交易哈希:{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {transactionHash}
                  </code>
                </p>
              </div>
            )}

            {paymentStatus === "failed" && (
              <Button onClick={handleReset} variant="destructive" size="lg">
                <AlertCircle className="w-4 h-4 mr-2" />
                重试支付
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentReceiver;
