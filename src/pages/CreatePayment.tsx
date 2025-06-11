import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CreditCard,
  Copy,
  QrCode,
  ExternalLink,
  Clock,
  DollarSign,
  Shield,
  Zap,
  Check,
  Link as LinkIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/hooks/useWallet";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const CreatePayment = () => {
  const { address } = useWallet();
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USDC");
  const [network, setNetwork] = useState("base");
  const [description, setDescription] = useState("");
  const [expiryDays, setExpiryDays] = useState("7");
  const [generatedLink, setGeneratedLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
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

  const handleGenerateLink = async () => {
    if (!amount || !currency || !network) {
      toast({
        title: "请填写必填字段",
        description: "金额、货币和网络都是必需的",
        variant: "destructive",
      });
      return;
    }

    if (!address) {
      toast({
        title: "请先连接钱包",
        description: "需要连接钱包来生成支付链接",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulate API call
    setTimeout(() => {
      const linkId = Math.random().toString(36).substring(2, 15);
      const link = `https://pay.pandon.dev/x402/${linkId}`;
      setGeneratedLink(link);
      setIsGenerating(false);

      toast({
        title: "支付链接已生成",
        description: "您的 x402 支付链接已准备就绪！",
      });
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    toast({
      title: "链接已复制",
      description: "支付链接已复制到剪贴板",
    });
  };

  const estimatedFee =
    networks.find((n) => n.value === network)?.fee || "0.001 USDC";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            创建 x402 支付链接
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            生成基于 x402 协议的支付链接，支持即时稳定币结算和全球访问
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Configuration */}
          <Card className="x402-card">
            <CardHeader>
              <CardTitle className="flex items-center text-green-primary">
                <CreditCard className="w-5 h-5 mr-2" />
                支付配置
              </CardTitle>
              <CardDescription>设置您的 x402 支付参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  支付金额 *
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="10.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0.01"
                  max="1000"
                  step="0.01"
                />
                <p className="text-xs text-muted-foreground">
                  最小 0.01，最大 1,000
                </p>
              </div>

              {/* Currency */}
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

              {/* Network */}
              <div className="space-y-2">
                <Label>区块链网络 *</Label>
                <Select value={network} onValueChange={setNetwork}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {networks.map((net) => (
                      <SelectItem key={net.value} value={net.value}>
                        <div className="flex flex-col">
                          <span>{net.label}</span>
                          <span className="text-xs text-muted-foreground">
                            Gas费: {net.fee} | 速度: {net.speed}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Receive Address */}
              <div className="space-y-2">
                <Label>接收地址 *</Label>
                <Input
                  value={address || ""}
                  disabled
                  className="bg-muted text-muted-foreground font-mono text-sm"
                  placeholder="请先连接钱包"
                />
                <p className="text-xs text-muted-foreground">
                  支付将发送到您连接的钱包地址，此地址不可修改
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  <Clock className="w-4 h-4 mr-1 inline" />
                  支付描述
                </Label>
                <Input
                  id="description"
                  placeholder="API 访问许可证 - 1个月"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Expiry */}
              <div className="space-y-2">
                <Label>链接有效期</Label>
                <Select value={expiryDays} onValueChange={setExpiryDays}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 天</SelectItem>
                    <SelectItem value="7">7 天</SelectItem>
                    <SelectItem value="30">30 天</SelectItem>
                    <SelectItem value="90">90 天</SelectItem>
                  </SelectContent>
                </Select>
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

              {/* Generate Button */}
              <Button
                onClick={handleGenerateLink}
                disabled={isGenerating || !address}
                className="x402-button w-full"
              >
                {isGenerating ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-spin" />
                    生成中...
                  </>
                ) : !address ? (
                  <>请先连接钱包</>
                ) : (
                  <>
                    <LinkIcon className="w-4 h-4 mr-2" />
                    生成 x402 支付链接
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Link */}
          <Card className="x402-card">
            <CardHeader>
              <CardTitle className="flex items-center text-green-primary">
                <LinkIcon className="w-5 h-5 mr-2" />
                生成的支付链接
              </CardTitle>
              <CardDescription>分享这个链接以接收 x402 支付</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {generatedLink ? (
                <>
                  {/* Link Display */}
                  <div className="space-y-3">
                    <div className="p-4 bg-muted rounded-lg border-2 border-dashed border-green-primary/30">
                      <div className="flex items-center justify-between">
                        <code className="text-sm text-green-primary break-all">
                          {generatedLink}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyToClipboard}
                          className="ml-2 shrink-0"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-green-primary" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div className="bg-accent/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">支付摘要</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>金额:</span>
                        <span className="font-medium">
                          {amount} {currency}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>网络:</span>
                        <span>
                          {networks.find((n) => n.value === network)?.label}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>接收地址:</span>
                        <span className="text-right font-mono text-xs">
                          {address?.slice(0, 6)}...{address?.slice(-4)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>有效期:</span>
                        <span>{expiryDays} 天</span>
                      </div>
                      {description && (
                        <div className="flex justify-between">
                          <span>描述:</span>
                          <span className="text-right">{description}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="flex items-center">
                      <QrCode className="w-4 h-4 mr-2" />
                      生成二维码
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      测试支付
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <LinkIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">
                    准备生成支付链接
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {!address
                      ? "请先连接钱包，然后填写左侧表单"
                      : "填写左侧表单并点击生成按钮"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CreatePayment;
