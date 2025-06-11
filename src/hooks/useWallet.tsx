
import { useState, useEffect } from 'react';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  isConnecting: boolean;
  balance: string;
}

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    isConnecting: false,
    balance: '0.00'
  });

  const connectWallet = async () => {
    setWalletState(prev => ({ ...prev, isConnecting: true }));
    
    // 模拟钱包连接过程
    setTimeout(() => {
      const mockAddress = '0x' + Math.random().toString(16).substring(2, 10);
      setWalletState({
        isConnected: true,
        address: mockAddress,
        isConnecting: false,
        balance: '125.50'
      });
      
      // 保存到 localStorage
      localStorage.setItem('wallet_connected', 'true');
      localStorage.setItem('wallet_address', mockAddress);
    }, 2000);
  };

  const disconnectWallet = () => {
    setWalletState({
      isConnected: false,
      address: null,
      isConnecting: false,
      balance: '0.00'
    });
    localStorage.removeItem('wallet_connected');
    localStorage.removeItem('wallet_address');
  };

  // 检查是否已连接钱包
  useEffect(() => {
    const isConnected = localStorage.getItem('wallet_connected') === 'true';
    const address = localStorage.getItem('wallet_address');
    
    if (isConnected && address) {
      setWalletState({
        isConnected: true,
        address,
        isConnecting: false,
        balance: '125.50'
      });
    }
  }, []);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet
  };
};
