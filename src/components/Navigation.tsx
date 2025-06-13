import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useWallet } from "@/hooks/useWallet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Zap,
  Menu,
  X,
  House,
  Code,
  CreditCard,
  BarChart3,
  Wallet,
  LogOut,
  Settings,
} from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();
  const {
    isConnected,
    address,
    balance,
    connectWallet,
    disconnectWallet,
    isConnecting,
  } = useWallet();

  const handleDisconnect = () => {
    disconnectWallet();
    navigate("/");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: "/", label: "首页", icon: House },
    { href: "/create", label: "创建支付", icon: CreditCard },
    // { href: "/checkout", label: "结账支付", icon: Wallet },
    { href: "/docs", label: "开发文档", icon: Code },
    { href: "/dashboard", label: "控制台", icon: BarChart3 },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-green-primary/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* <div className="w-8 h-8 gradient-green rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div> */}
            <img src="/logo.png" alt="Pandon Pay" className="w-8 h-8 mr-2" />
            <span className="text-xl font-bold text-green-primary">
              Pandon Pay
            </span>
            <Badge className="bg-secondary/20 text-secondary-foreground text-xs">
              x402
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-green-primary bg-accent"
                      : "text-muted-foreground hover:text-green-primary hover:bg-accent/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-green-primary/10 border-green-primary/30 hover:bg-green-primary/20"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    <div className="flex flex-col text-left">
                      <span className="text-xs text-green-primary font-medium">
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {balance} ETH
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-background border border-green-primary/20"
                >
                  <DropdownMenuLabel className="text-green-primary">
                    钱包信息
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <div className="px-2 py-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">地址</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {address}
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium">余额</p>
                      <p className="text-xs text-muted-foreground">
                        {balance} ETH
                      </p>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard")}
                    className="cursor-pointer"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    控制台
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => navigate("/create")}
                    className="cursor-pointer"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    创建支付
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleDisconnect}
                    className="cursor-pointer text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    断开连接
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                onClick={connectWallet}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <>
                    <div className="w-4 h-4 mr-2 animate-spin border-2 border-current border-t-transparent rounded-full" />
                    连接中...
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4 mr-2" />
                    连接钱包
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
