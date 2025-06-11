import { useState, useEffect } from "react";

interface WalletState {
  isConnected: boolean;
  address: string | null;
  isConnecting: boolean;
  balance: string;
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (accounts: string[]) => void) => void;
      removeListener: (
        event: string,
        callback: (accounts: string[]) => void,
      ) => void;
      isMetaMask?: boolean;
    };
  }
}

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    isConnecting: false,
    balance: "0.00",
  });

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("请安装 MetaMask 钱包！");
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    setWalletState((prev) => ({ ...prev, isConnecting: true }));

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        const address = accounts[0];

        // 获取余额
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        });

        // 转换余额从 wei 到 ETH
        const balanceInEth = (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(
          4,
        );

        setWalletState({
          isConnected: true,
          address,
          isConnecting: false,
          balance: balanceInEth,
        });

        // 保存到 localStorage
        localStorage.setItem("wallet_connected", "true");
        localStorage.setItem("wallet_address", address);
      }
    } catch (error) {
      console.error("连接钱包失败:", error);
      setWalletState((prev) => ({ ...prev, isConnecting: false }));
    }
  };

  const disconnectWallet = () => {
    setWalletState({
      isConnected: false,
      address: null,
      isConnecting: false,
      balance: "0.00",
    });
    localStorage.removeItem("wallet_connected");
    localStorage.removeItem("wallet_address");
  };

  // 监听账户变化
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setWalletState((prev) => ({
            ...prev,
            address: accounts[0],
          }));
          localStorage.setItem("wallet_address", accounts[0]);
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        window.ethereum?.removeListener(
          "accountsChanged",
          handleAccountsChanged,
        );
      };
    }
  }, []);

  // 检查是否已连接钱包
  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = localStorage.getItem("wallet_connected") === "true";
      const address = localStorage.getItem("wallet_address");

      if (isConnected && address && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });

          if (accounts.length > 0 && accounts[0] === address) {
            const balance = await window.ethereum.request({
              method: "eth_getBalance",
              params: [address, "latest"],
            });

            const balanceInEth = (
              parseInt(balance, 16) / Math.pow(10, 18)
            ).toFixed(4);

            setWalletState({
              isConnected: true,
              address,
              isConnecting: false,
              balance: balanceInEth,
            });
          }
        } catch (error) {
          console.error("检查钱包连接失败:", error);
        }
      }
    };

    if (window.ethereum) {
      checkConnection();
    }
  }, []);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
  };
};
