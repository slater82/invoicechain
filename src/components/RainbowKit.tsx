import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ScanLine, Wallet } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { Button } from './ui/LayoutPrimitives';

// Icons
const MetamaskIcon = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8">
    <path fill="#E17726" d="M29.2 12.4l-1.9-5.4c-.2-.6-1-1.1-1.7-.8L21.3 8c-.6.2-1.3-.2-1.4-.9L19.4 4c-.1-.7-.8-1.2-1.5-1.1l-6.1.9c-.7.1-1.2.8-1.1 1.5l.5 3.3c.1.7-.3 1.3-.9 1.5l-4.5 1.5c-.7.2-1.1.9-.9 1.6l2.1 5.9c.2.6.9 1 1.5.8l2.9-1c.6-.2 1.3.2 1.4.9l.7 4.1c.1.7.8 1.2 1.5 1.1l6.1-.9c.7-.1 1.2-.8 1.1-1.5l-.5-3.3c-.1-.7.3-1.3.9-1.5l4.3-1.4c.7-.3 1.2-.9 1-1.6z"/>
    <path fill="#E27625" d="M29.2 12.4L27.3 7c-.2-.6-1-1.1-1.7-.8l-4.3 1.8c-.6.2-1.3-.2-1.4-.9L19.4 4c-.1-.7-.8-1.2-1.5-1.1l-6.1.9c-.7.1-1.2.8-1.1 1.5l.5 3.3c.1.7-.3 1.3-.9 1.5l-4.5 1.5c-.7.2-1.1.9-.9 1.6l2.1 5.9c.2.6.9 1 1.5.8l2.9-1c.6-.2 1.3.2 1.4.9l.7 4.1c.1.7.8 1.2 1.5 1.1l6.1-.9c.7-.1 1.2-.8 1.1-1.5l-.5-3.3c-.1-.7.3-1.3.9-1.5l4.3-1.4c.7-.3 1.2-.9 1-1.6z"/>
  </svg>
);

const RainbowIcon = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8">
    <circle cx="16" cy="16" r="16" fill="#0E76FD"/>
    <path d="M16 8a8 8 0 0 1 8 8h-4a4 4 0 0 0-4-4V8z" fill="#fff"/>
    <path d="M16 11a5 5 0 0 1 5 5h-2.5a2.5 2.5 0 0 0-2.5-2.5V11z" fill="#fff" opacity="0.6"/>
  </svg>
);

const WalletConnectIcon = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8">
    <path fill="#3B99FC" d="M6 13.5c0-4.1 4.5-7.5 10-7.5s10 3.4 10 7.5c0 4.1-4.5 7.5-10 7.5s-10-3.4-10-7.5zm16.5 0c0-2.5-2.9-4.5-6.5-4.5s-6.5 2-6.5 4.5 2.9 4.5 6.5 4.5 6.5-2 6.5-4.5z"/>
  </svg>
);

const CoinbaseIcon = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8">
    <circle cx="16" cy="16" r="16" fill="#0052FF"/>
    <path d="M16 8.5C11.8 8.5 8.5 11.8 8.5 16s3.3 7.5 7.5 7.5 7.5-3.3 7.5-7.5-3.3-7.5-7.5-7.5zm0 11.5c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" fill="#fff"/>
  </svg>
);

export const ConnectButton = ({ className, children, ...props }: any) => {
  const { openModal, isConnected, address } = useWallet();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <Button 
          variant="secondary" 
          className="font-bold font-sans bg-white text-black hover:bg-gray-200 border-none shadow-lg rounded-xl h-10"
        >
          {address.slice(0, 6)}...{address.slice(-4)}
          <ChevronDownIcon />
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={openModal} 
      className={`bg-white text-black hover:bg-gray-100 font-bold rounded-xl shadow-[0_4px_12px_rgba(255,255,255,0.1)] border-none h-10 px-4 ${className}`}
      {...props}
    >
      {children || 'Connect Wallet'}
    </Button>
  );
};

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const RainbowKitModal = () => {
  const { isModalOpen, closeModal, connect, isConnecting } = useWallet();
  const [activeWallet, setActiveWallet] = useState<string | null>(null);

  const handleConnect = async (wallet: string) => {
    setActiveWallet(wallet);
    await connect(wallet === 'Metamask' ? 'browser' : 'mock');
    setActiveWallet(null);
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-[360px] bg-[#1A1B1F] rounded-2xl shadow-2xl overflow-hidden border border-[#2D2F36]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#2D2F36]">
              <h2 className="text-lg font-bold text-white">Connect a Wallet</h2>
              <button onClick={closeModal} className="p-1 rounded-full hover:bg-white/10 transition-colors">
                <X size={20} className="text-[#98A1C0]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-2">
              {isConnecting ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-6">
                   <div className="relative w-20 h-20 flex items-center justify-center">
                     <div className="absolute inset-0 border-4 border-[#3B99FC]/30 rounded-2xl animate-pulse" />
                     <div className="absolute inset-0 border-4 border-t-[#3B99FC] rounded-2xl animate-spin" />
                     {activeWallet === 'Rainbow' ? <RainbowIcon /> : 
                      activeWallet === 'Metamask' ? <MetamaskIcon /> : 
                      <Wallet className="w-8 h-8 text-[#3B99FC]" />}
                   </div>
                   <div className="text-center">
                     <h3 className="text-white font-bold mb-1">Requesting Connection</h3>
                     <p className="text-[#98A1C0] text-sm">Accept the request in your wallet</p>
                   </div>
                </div>
              ) : (
                <div className="space-y-1">
                  {[
                    { name: 'Rainbow', icon: RainbowIcon, badge: 'Recent' },
                    { name: 'Metamask', icon: MetamaskIcon },
                    { name: 'Coinbase Wallet', icon: CoinbaseIcon },
                    { name: 'WalletConnect', icon: WalletConnectIcon },
                  ].map((wallet) => (
                    <button
                      key={wallet.name}
                      onClick={() => handleConnect(wallet.name)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shadow-inner">
                          <wallet.icon />
                        </div>
                        <span className="font-bold text-white">{wallet.name}</span>
                      </div>
                      {wallet.badge && (
                        <span className="text-xs font-bold text-[#3B99FC] bg-[#3B99FC]/10 px-2 py-1 rounded">
                          {wallet.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {!isConnecting && (
              <div className="p-4 border-t border-[#2D2F36]">
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-[#2D2F36]/50 hover:bg-[#2D2F36] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-[#3B99FC]/20 text-[#3B99FC]">
                      <ScanLine size={16} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-white">New to wallets?</p>
                      <p className="text-xs text-[#98A1C0]">Learn more about wallets</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-[#98A1C0]" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
