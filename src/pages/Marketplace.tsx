import React from 'react';
import { motion } from 'framer-motion';
import { 
  Filter, 
  Search, 
  TrendingUp, 
  ShieldCheck, 
  MapPin, 
  Calendar 
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui/LayoutPrimitives';
import { MOCK_INVOICES } from '../constants';
import { Invoice } from '../../types';

const RiskGradeBadge = ({ grade }: { grade: string }) => {
  const colors: Record<string, string> = {
    'A+': 'bg-emerald-500 text-white',
    'A': 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30',
    'B+': 'bg-blue-600/20 text-blue-400 border-blue-500/30',
    'B': 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30',
    'C': 'bg-orange-600/20 text-orange-400 border-orange-500/30',
  };
  
  return (
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg border ${colors[grade] || colors['C']}`}>
      {grade}
    </div>
  );
};

const InvoiceMarketCard: React.FC<{ invoice: Invoice }> = ({ invoice }) => (
  <Card className="hover:border-accent-primary/50 transition-all cursor-pointer group">
    <div className="flex justify-between items-start mb-4">
      <RiskGradeBadge grade={invoice.riskGrade} />
      <div className="text-right">
        <p className="text-xs text-text-tertiary">Amount</p>
        <p className="text-xl font-bold font-mono text-text-primary">₹{invoice.amount.toLocaleString('en-IN')}</p>
      </div>
    </div>
    
    <div className="space-y-3 mb-6">
      <div>
        <p className="text-xs text-text-tertiary">MSME</p>
        <p className="font-medium truncate">{invoice.msmeName}</p>
      </div>
      <div>
        <p className="text-xs text-text-tertiary">Buyer (Corporate)</p>
        <div className="flex items-center gap-2">
           <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-[10px] font-bold">
             {invoice.buyerName.substring(0, 1)}
           </div>
           <p className="font-medium truncate">{invoice.buyerName}</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-2 mb-4">
      <div className="bg-bg-tertiary p-2 rounded-md">
        <p className="text-[10px] text-text-tertiary">Return</p>
        <p className="text-sm font-bold text-accent-success">~{(invoice.amount * (invoice.discountRate/100)).toLocaleString('en-IN')}</p>
      </div>
      <div className="bg-bg-tertiary p-2 rounded-md">
        <p className="text-[10px] text-text-tertiary">Duration</p>
        <p className="text-sm font-medium">45 Days</p>
      </div>
    </div>

    <div className="flex gap-2 mb-4">
       <div className="flex items-center gap-1 text-[10px] bg-accent-info/10 text-accent-info px-2 py-1 rounded border border-accent-info/20">
         <ShieldCheck size={12} /> Verified
       </div>
       <div className="flex items-center gap-1 text-[10px] bg-accent-primary/10 text-accent-primary px-2 py-1 rounded border border-accent-primary/20">
         <MapPin size={12} /> Tracked
       </div>
    </div>

    <div className="flex gap-2 mt-auto">
      <Button variant="outline" size="sm" className="flex-1" onClick={() => window.location.hash = `#/invoices/${invoice.id}`}>Details</Button>
      <Button size="sm" className="flex-1">Fund</Button>
    </div>
  </Card>
);

export default function Marketplace() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Funder Marketplace</h1>
          <p className="text-text-secondary">Browse verified invoices with high returns</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
             <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-tertiary" />
             <input className="pl-9 h-10 rounded-md bg-bg-secondary border border-border-primary text-sm w-64 focus:ring-1 focus:ring-accent-primary focus:outline-none" placeholder="Search by Buyer or MSME..." />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter size={16} /> Filters
          </Button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All Invoices', 'Grade A+ Only', 'Automotive Sector', 'Short Term (<30 days)', 'High Value (>₹10L)'].map((filter, i) => (
          <button key={i} className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap border ${i === 0 ? 'bg-accent-primary text-white border-accent-primary' : 'bg-bg-secondary border-border-primary text-text-secondary hover:border-text-secondary'}`}>
            {filter}
          </button>
        ))}
      </div>

      {/* Invoice Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_INVOICES.map((inv) => (
          <InvoiceMarketCard key={inv.id} invoice={inv} />
        ))}
        {/* Duplicating for UI fullness */}
        {MOCK_INVOICES.map((inv) => (
          <InvoiceMarketCard key={`${inv.id}-dup`} invoice={{...inv, id: `${inv.id}-dup`, invoiceNumber: `${inv.invoiceNumber}-B`}} />
        ))}
      </div>
    </div>
  );
}