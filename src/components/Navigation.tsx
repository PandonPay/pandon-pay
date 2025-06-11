
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { Wallet, LogOut } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";

const Navigation = () => {
  const navigate = useNavigate();
  const { isConnected, address, disconnectWallet } = useWallet();

  const handleDisconnect = () => {
    disconnectWallet();
    navigate("/");
  };

  return (
    <nav className="border-b border-green-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-green-primary">
              Pandon Pay
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/docs" className="text-muted-foreground hover:text-green-primary transition-colors">
              文档
            </Link>
            {isConnected && (
              <>
                <Link to="/dashboard" className="text-muted-foreground hover:text-green-primary transition-colors">
                  控制台
                </Link>
                <Link to="/create" className="text-muted-foreground hover:text-green-primary transition-colors">
                  创建支付
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="bg-green-primary/10 text-green-primary border-green-primary/30">
                  <Wallet className="w-3 h-3 mr-1" />
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </Badge>
                <Button variant="outline" size="sm" onClick={handleDisconnect}>
                  <LogOut className="w-4 h-4 mr-1" />
                  断开
                </Button>
              </div>
            ) : (
              <Link to="/">
                <Button variant="outline">
                  <Wallet className="w-4 h-4 mr-2" />
                  连接钱包
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
