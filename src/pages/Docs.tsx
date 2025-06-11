import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import {
  Code,
  BookOpen,
  Zap,
  Copy,
  ExternalLink,
  CheckCircle,
  ArrowRight,
  Terminal,
  GitBranch,
  Rocket,
} from "lucide-react";
import { Footer } from "@/components/Footer";

const Docs = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const quickStartCode = `// 安装 Pandon Pay SDK
npm install @pandon/x402-sdk

// 服务器端 - 1行代码集成
app.use(Pandon.X402Middleware());

// 客户端 - 启用 x402 支付
import { Pandon } from '@pandon/x402-sdk';

Pandon.enableX402({
  amount: 10.5,
  currency: 'USDC',
  network: 'base'
});`;

  const apiExamples = {
    createPayment: `// 创建支付链接
const payment = await Pandon.createPayment({
  amount: 25.0,
  currency: 'USDC',
  description: 'API 访问费用',
  expiresIn: '24h'
});

console.log(payment.url); // https://pay.pandon.com/abc123`,

    handlePayment: `// 处理 HTTP 402 响应
async function handle402(response) {
  const paymentDetails = response.headers['x-payment-required'];
  const payment = await wallet.signX402(paymentDetails);
  
  // 重新请求资源
  return fetch(originalUrl, {
    headers: { 'X-PAYMENT': payment }
  });
}`,

    webhook: `// Webhook 处理
app.post('/webhook/pandon', (req, res) => {
  const { event, payment } = req.body;
  
  if (event === 'payment.completed') {
    // 支付完成，释放资源
    unlockResource(payment.metadata.resourceId);
  }
  
  res.status(200).send('OK');
});`,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 gradient-green rounded-lg flex items-center justify-center mr-3">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-green-primary">开发文档</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            使用 Pandon Pay x402
            协议，只需几行代码即可为您的应用添加稳定币支付功能
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 侧边导航 */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">文档导航</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  快速开始
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  <Code className="w-4 h-4 mr-2" />
                  API 参考
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  <Terminal className="w-4 h-4 mr-2" />
                  SDK 指南
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  <GitBranch className="w-4 h-4 mr-2" />
                  示例项目
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 主要内容 */}
          <div className="lg:col-span-3 space-y-8">
            {/* 快速开始 */}
            <Card className="x402-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Rocket className="w-5 h-5 mr-2 text-primary" />
                  快速开始
                </CardTitle>
                <CardDescription>
                  3 分钟内完成 x402 协议集成，开始接收稳定币支付
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted rounded-lg p-4 relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() =>
                        copyToClipboard(quickStartCode, "quickstart")
                      }
                    >
                      {copiedCode === "quickstart" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    <pre className="text-sm overflow-x-auto">
                      <code>{quickStartCode}</code>
                    </pre>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-primary font-bold">1</span>
                      </div>
                      <h4 className="font-semibold mb-1">安装 SDK</h4>
                      <p className="text-sm text-muted-foreground">
                        使用 npm 安装 Pandon Pay SDK
                      </p>
                    </div>

                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-primary font-bold">2</span>
                      </div>
                      <h4 className="font-semibold mb-1">服务器集成</h4>
                      <p className="text-sm text-muted-foreground">
                        1 行代码添加中间件
                      </p>
                    </div>

                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-primary font-bold">3</span>
                      </div>
                      <h4 className="font-semibold mb-1">客户端启用</h4>
                      <p className="text-sm text-muted-foreground">
                        配置支付参数开始使用
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API 示例 */}
            <Card className="x402-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="w-5 h-5 mr-2 text-primary" />
                  API 示例
                </CardTitle>
                <CardDescription>
                  常用的 x402 协议集成模式和代码示例
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="create" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="create">创建支付</TabsTrigger>
                    <TabsTrigger value="handle">处理支付</TabsTrigger>
                    <TabsTrigger value="webhook">Webhook</TabsTrigger>
                  </TabsList>

                  <TabsContent value="create" className="mt-4">
                    <div className="bg-muted rounded-lg p-4 relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() =>
                          copyToClipboard(apiExamples.createPayment, "create")
                        }
                      >
                        {copiedCode === "create" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <pre className="text-sm overflow-x-auto">
                        <code>{apiExamples.createPayment}</code>
                      </pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="handle" className="mt-4">
                    <div className="bg-muted rounded-lg p-4 relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() =>
                          copyToClipboard(apiExamples.handlePayment, "handle")
                        }
                      >
                        {copiedCode === "handle" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <pre className="text-sm overflow-x-auto">
                        <code>{apiExamples.handlePayment}</code>
                      </pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="webhook" className="mt-4">
                    <div className="bg-muted rounded-lg p-4 relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() =>
                          copyToClipboard(apiExamples.webhook, "webhook")
                        }
                      >
                        {copiedCode === "webhook" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <pre className="text-sm overflow-x-auto">
                        <code>{apiExamples.webhook}</code>
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* x402 协议特性 */}
            <Card className="x402-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  x402 协议优势
                </CardTitle>
                <CardDescription>
                  了解为什么选择 x402 协议进行 Web3 支付
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      技术优势
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• HTTP 原生支付，无需重定向</li>
                      <li>• 自动化友好，支持 AI 代理</li>
                      <li>• Layer2 优化，确认时间 ≤ 3 秒</li>
                      <li>• 智能合约保障资金安全</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      商业优势
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• 即时全球结算，无地域限制</li>
                      <li>• 极低手续费，无退款风险</li>
                      <li>• 支持微支付和计量服务</li>
                      <li>• 可编程支付逻辑</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 更多资源 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="x402-card">
                <CardHeader>
                  <CardTitle className="text-lg">示例项目</CardTitle>
                  <CardDescription>查看完整的集成示例</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="x402-button w-full">
                    <GitBranch className="w-4 h-4 mr-2" />
                    查看 GitHub 示例
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="x402-card">
                <CardHeader>
                  <CardTitle className="text-lg">开发者社区</CardTitle>
                  <CardDescription>加入我们的开发者社区</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Discord 社区
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Docs;
