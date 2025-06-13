import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-green-primary/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              {/* <div className="w-8 h-8 gradient-green rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div> */}
              <img src="/logo.png" alt="Pandon Pay" className="w-8 h-8 mr-2" />
              <span className="text-xl font-bold text-green-primary">
                Pandon Pay
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              基于 x402 协议的下一代 Web3 支付，让每一次交易都如发送消息般简单。
            </p>
            <div className="text-sm text-muted-foreground">
              © 2025 Pandon Pay. All rights reserved.
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">产品</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://www.x402.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-primary transition-colors duration-200"
                >
                  x402 协议
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-primary transition-colors duration-200"
                >
                  开发者 API
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-primary transition-colors duration-200"
                >
                  SDK 文档
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-primary transition-colors duration-200"
                >
                  示例代码
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">支持</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="#"
                  className="hover:text-green-primary transition-colors duration-200"
                >
                  帮助中心
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-primary transition-colors duration-200"
                >
                  社区论坛
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-primary transition-colors duration-200"
                >
                  技术支持
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-green-primary transition-colors duration-200"
                >
                  状态页面
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">社区</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://twitter.com/pandonpay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-primary transition-colors duration-200"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/pandonpay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-primary transition-colors duration-200"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/pandonpay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-primary transition-colors duration-200"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
