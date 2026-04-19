import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Wallet, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X,
  TrendingUp,
  Store,
  LogOut,
  ChevronDown,
  UserCircle,
  ShieldCheck
} from 'lucide-react';
import { Button } from './ui/LayoutPrimitives';
import { CURRENT_USER } from '../constants';
import { useWallet } from '../contexts/WalletContext';

const SidebarItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
        isActive
          ? 'bg-accent-primary/10 text-accent-primary'
          : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
      }`
    }
  >
    <Icon size={18} />
    {label}
  </NavLink>
);

export default function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isConnected, address, disconnect } = useWallet();
  const isLanding = location.pathname === '/';

  // Protect routes
  useEffect(() => {
    if (!isLanding && !isConnected) {
      navigate('/');
    }
  }, [isLanding, isConnected, navigate]);

  // Close settings dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLanding) return <Outlet />;

  // Create a display string for the wallet
  const displayAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : CURRENT_USER.walletAddress;

  const handleSignOut = () => {
    disconnect();
    navigate('/');
  };

  return (
    <div className="flex h-screen w-full bg-bg-primary text-text-primary overflow-hidden font-sans">
      {/* Sidebar */}
      <AnimatePresence mode='wait'>
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="hidden md:flex flex-col border-r border-border-primary bg-bg-secondary h-full"
          >
            <div 
              className="flex h-16 items-center px-6 border-b border-border-primary cursor-pointer hover:bg-bg-tertiary transition-colors"
              onClick={() => navigate('/')}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
                  <TrendingUp className="text-white" size={18} />
                </div>
                <span className="text-lg font-bold tracking-tight">InvoiceChain</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
              <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                MSME Platform
              </div>
              <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
              <SidebarItem to="/invoices" icon={FileText} label="My Invoices" />
              <SidebarItem to="/invoices/new" icon={PlusCircle} label="Create Invoice" />
              <SidebarItem to="/funding" icon={TrendingUp} label="Funding Status" />
              
              <div className="mt-8 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                Finance
              </div>
              <SidebarItem to="/wallet" icon={Wallet} label="Wallet & Settlements" />
              <div className="mt-8 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
  Engineer
</div>

<SidebarItem
  to="/engineer"
  icon={ShieldCheck}
  label="Engineer Inspection"
/>

              
              <div className="mt-8 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                Funder Mode (Demo)
              </div>
              <SidebarItem to="/marketplace" icon={Store} label="Marketplace" />
            </div>

            <div className="border-t border-border-primary p-4">
              <div className="flex items-center gap-3 rounded-lg bg-bg-tertiary p-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold text-xs shadow-lg">
                  {address ? address.slice(2,4).toUpperCase() : 'RK'}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium">{CURRENT_USER.companyName}</p>
                  <p className="truncate text-xs text-text-tertiary font-mono">{displayAddress}</p>
                </div>
                <button onClick={handleSignOut} className="text-text-tertiary hover:text-accent-error">
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-border-primary bg-bg-secondary/50 backdrop-blur-md px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="text-text-secondary hover:text-text-primary md:block hidden"
            >
              <Menu size={20} />
            </button>
            <div className="relative w-64 md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search invoices, buyers, transaction hash..."
                className="h-9 w-full rounded-md bg-bg-primary border border-border-primary pl-9 pr-4 text-sm text-text-primary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-accent-info/30 bg-accent-info/10 px-3 py-1">
              <div className="h-2 w-2 rounded-full bg-accent-info animate-pulse" />
              <span className="text-xs font-medium text-accent-info">Polygon Mainnet</span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-bg-tertiary rounded-full border border-border-primary">
              <div className="w-2 h-2 rounded-full bg-accent-success" />
              <span className="text-xs font-mono font-medium">{displayAddress}</span>
            </div>

            <button className="relative text-text-secondary hover:text-text-primary">
              <Bell size={20} />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent-error" />
            </button>
            <div className="h-8 w-px bg-border-primary mx-1" />
            
            {/* Settings Dropdown */}
            <div className="relative" ref={settingsRef}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2"
                onClick={() => setSettingsOpen(!isSettingsOpen)}
              >
                <Settings size={18} />
                <span className="hidden sm:inline">Settings</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isSettingsOpen ? 'rotate-180' : ''}`} />
              </Button>

              <AnimatePresence>
                {isSettingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-0 mt-2 w-56 rounded-xl border border-border-primary bg-bg-secondary p-1.5 shadow-xl z-50 origin-top-right"
                  >
                     <div className="px-3 py-2 border-b border-border-primary mb-1">
                        <p className="text-sm font-medium">{CURRENT_USER.name}</p>
                        <p className="text-xs text-text-tertiary truncate">{CURRENT_USER.companyName}</p>
                     </div>
                    <button 
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors"
                      onClick={() => setSettingsOpen(false)}
                    >
                      <UserCircle size={16} /> Profile Settings
                    </button>
                    <div className="my-1 h-px bg-border-primary/50" />
                    <button 
                      onClick={() => {
                        setSettingsOpen(false);
                        handleSignOut();
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-accent-error hover:bg-accent-error/10 transition-colors"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-bg-primary p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}