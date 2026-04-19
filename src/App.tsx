import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';

import Layout from './components/Layout';
import Landing from './pages/Landing';
import UserInterfaceLayer from "./components/ui/UserInterfaceLayer";
import Dashboard from './pages/Dashboard';
import CreateInvoice from './pages/CreateInvoice';
import Marketplace from './pages/Marketplace';
import InvoiceDetail from './pages/InvoiceDetail';
import EngineerCheck from './pages/EngineerCheck';
import { WalletProvider } from './contexts/WalletContext';
import { RainbowKitModal } from './components/RainbowKit';



export default function App() {
  return (
    <WalletProvider>
      <HashRouter>
        <Routes>
          
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="auth" element={<Auth />} />
            <Route path="invoices/new" element={<CreateInvoice />} />
            <Route path="invoices/:id" element={<InvoiceDetail />} />
            <Route path="engineer" element={<EngineerCheck />} />

            <Route path="inspection/new" element={<EngineerCheck />} />
            <Route path="marketplace" element={<Marketplace />} />
            {/* Fallback routes */}
            <Route path="invoices" element={<Dashboard />} />
            <Route path="funding" element={<Dashboard />} />
            <Route path="wallet" element={<Dashboard />} />
          </Route>
        </Routes>
      </HashRouter>

      <RainbowKitModal />
    </WalletProvider>
    
  );
}
