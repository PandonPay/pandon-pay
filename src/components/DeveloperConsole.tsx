
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Code, 
  Copy, 
  Play, 
  Terminal, 
  Zap, 
  Check,
  ExternalLink,
  Book,
  Cpu
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DeveloperConsole = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
    
    toast({
      title: "代码已复制",
      description: `${label} 已复制到剪贴板`,
    });
  };

  const codeExamples = {
    server: `// Express.js 服务器集成 (1行代码)
const express = require('express');
const { X402Middleware } = require('@pandon/x402-sdk');

const app = express();

// 启用 x402 支付保护
app.use('/api/premium', X402Middleware({
  amount: '10.00',
  currency: 'USDC',
  network: 'base',
  apiKey: 'your-api-key'
}));

app.get('/api/premium/data', (req, res) => {
  // 只有付费用户才能访问
  res.json({ data: 'Premium content' });
});`,

    client: `// 客户端自动处理 x402 支付
import { enableX402 } from '@pandon/x402-client';

// 一行代码启用自动支付
enableX402({
  wallet: 'auto', // 自动检测钱包
  retries: 3,
  timeout: 120000
});

// 正常发起请求，x402 自动处理
async function fetchPremiumData() {
  try {
    const response = await fetch('/api/premium/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Payment failed:', error);
  }
}`,

    react: `// React Hook 集成
import { useX402Payment } from '@pandon/x402-react';

function PremiumContent() {
  const { 
    triggerPayment, 
    isLoading, 
    isSuccess 
  } = useX402Payment({
    amount: '10.00',
    currency: 'USDC'
  });

  return (
    <div>
      {!isSuccess ? (
        <button 
          onClick={triggerPayment}
          disabled={isLoading}
        >
          {isLoading ? '支付中...' : '解锁内容 ($10 USDC)'}
        </button>
      ) : (
        <div>🎉 高级内容已解锁！</div>
      )}
    </div>
  );
}`,

    ai: `// AI 代理自动化支付
import { AutoPaymentAgent } from '@pandon/x402-ai';

const agent = new AutoPaymentAgent({
  wallet: process.env.AGENT_WALLET_KEY,
  budget: {
    daily: '100.00',
    perTransaction: '50.00'
  },
  autoApprove: true
});

// AI 代理自动采购 GPU 资源
async function purchaseGPU() {
  const resource = await agent.purchase('https://gpu-provider.com/api/rent', {
    hours: 2,
    gpuType: 'A100'
  });
  
  return resource;
}`
  };

  const quickStart = [
    {
      step: "1",
      title: "安装 SDK",
      command: "npm install @pandon/x402-sdk",
      description: "安装 Pandon Pay x402 SDK"
    },
    {
      step: "2", 
      title: "获取 API Key",
      command: "curl -X POST https://api.pandon.dev/auth/register",
      description: "注册并获取您的 API 密钥"
    },
    {
      step: "3",
      title: "集成支付",
      command: "app.use(X402Middleware(config))",
      description: "一行代码启用 x402 支付保护"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          开发者控制台
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          体验 x402 协议的强大功能：HTTP 原生支付、AI 代理集成、一行代码部署
        </p>
      </div>

      {/* Quick Start */}
      <Card className="border-green-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="flex items-center text-green-800">
            <Zap className="w-5 h-5 mr-2" />
            快速开始
          </CardTitle>
          <CardDescription className="text-green-600">
            3 分钟集成 x402 支付到您的应用
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {quickStart.map((item, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                  {item.command}
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card className="border-green-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="w-5 h-5 mr-2" />
            代码示例
          </CardTitle>
          <CardDescription>
            真实的集成代码，直接复制使用
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="server" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="server">服务端</TabsTrigger>
              <TabsTrigger value="client">客户端</TabsTrigger>
              <TabsTrigger value="react">React</TabsTrigger>
              <TabsTrigger value="ai">AI 代理</TabsTrigger>
            </TabsList>

            {Object.entries(codeExamples).map(([key, code]) => (
              <TabsContent key={key} value={key} className="mt-6">
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm">
                    <code>{code}</code>
                  </pre>
                  <Button
                    onClick={() => copyToClipboard(code, `${key} 代码`)}
                    variant="outline"
                    size="sm"
                    className="absolute top-4 right-4 bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    {copied === `${key} 代码` ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border-green-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Terminal className="w-5 h-5 mr-2" />
              API 配置
            </CardTitle>
            <CardDescription>
              配置您的 x402 集成参数
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API 密钥</Label>
              <div className="flex gap-2">
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="pk_live_..."
                  className="font-mono"
                />
                <Button variant="outline">
                  <Play className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
              <Cpu className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                测试环境已准备就绪，您可以立即开始集成测试
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">测试网络:</span>
                <Badge className="bg-orange-100 text-orange-700">Base Sepolia</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">测试代币:</span>
                <span className="font-mono">USDC (测试)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">费率:</span>
                <span className="text-green-600 font-medium">0.3%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="w-5 h-5 mr-2" />
              开发资源
            </CardTitle>
            <CardDescription>
              文档、工具和社区支持
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center">
                  <Book className="w-4 h-4 mr-2" />
                  完整 API 文档
                </span>
                <ExternalLink className="w-4 h-4" />
              </Button>
              
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center">
                  <Code className="w-4 h-4 mr-2" />
                  SDK 参考手册
                </span>
                <ExternalLink className="w-4 h-4" />
              </Button>
              
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  示例项目仓库
                </span>
                <ExternalLink className="w-4 h-4" />
              </Button>
              
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center">
                  <Terminal className="w-4 h-4 mr-2" />
                  开发者社区
                </span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>

            <Separator />

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">需要帮助？</h4>
              <p className="text-sm text-green-700 mb-3">
                我们的技术团队 24/7 在线，随时为您的集成提供支持
              </p>
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                联系技术支持
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeveloperConsole;
