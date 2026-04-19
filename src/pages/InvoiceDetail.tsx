import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, FileText, CheckCircle, Clock, Video, Image, Download, Shield } from 'lucide-react';
import { Card, Button, Badge } from '../components/ui/LayoutPrimitives';
import { MOCK_INVOICES } from '../constants';

export default function InvoiceDetail() {
  const { id } = useParams();
  const invoice = MOCK_INVOICES.find(i => i.id === id) || MOCK_INVOICES[0];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-text-primary">{invoice.invoiceNumber}</h1>
            <Badge variant={invoice.status === 'FUNDED' ? 'success' : 'warning'}>{invoice.status}</Badge>
          </div>
          <p className="text-text-secondary">Created on {invoice.date}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Download PDF</Button>
          {invoice.status !== 'FUNDED' && <Button>Request Early Payment</Button>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Parties */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">Parties Involved</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-xs text-text-tertiary uppercase mb-1">Supplier (MSME)</p>
                <p className="font-medium text-lg">{invoice.msmeName}</p>
                <p className="text-sm text-text-secondary">GSTIN: 27AABCT1234A1Z5</p>
                <p className="text-sm text-text-secondary">Mumbai, Maharashtra</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-tertiary uppercase mb-1">Buyer (Corporate)</p>
                <p className="font-medium text-lg">{invoice.buyerName}</p>
                <p className="text-sm text-text-secondary">GSTIN: 29AAACR5678B1Z2</p>
                <p className="text-sm text-text-secondary">Verified Corporate Partner <CheckCircle size={14} className="inline text-accent-primary" /></p>
              </div>
            </div>
          </Card>

          {/* Line Items */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">Invoice Items</h3>
            <table className="w-full text-sm">
              <thead className="bg-bg-tertiary text-text-tertiary">
                <tr>
                  <th className="px-4 py-2 text-left rounded-l">Description</th>
                  <th className="px-4 py-2 text-right">Qty</th>
                  <th className="px-4 py-2 text-right">Unit Price</th>
                  <th className="px-4 py-2 text-right rounded-r">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-primary">
                {invoice.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3">{item.description}</td>
                    <td className="px-4 py-3 text-right">{item.quantity}</td>
                    <td className="px-4 py-3 text-right">₹{item.unitPrice.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-mono">₹{item.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-border-secondary font-bold">
                  <td colSpan={3} className="px-4 py-4 text-right">Total Amount</td>
                  <td className="px-4 py-4 text-right text-lg">₹{invoice.amount.toLocaleString('en-IN')}</td>
                </tr>
              </tfoot>
            </table>
          </Card>

          {/* Proof Metadata Section - KEY FEATURE */}
          <Card className="border-accent-primary/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 bg-accent-primary/10 rounded-bl-xl border-l border-b border-accent-primary/20">
              <span className="text-xs font-bold text-accent-primary">Blockchain Verified</span>
            </div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Shield className="text-accent-primary" size={20} /> Proof Metadata Layer
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
               {invoice.proofMetadata?.deliveryPhotos.map((photo, i) => (
                 <div key={i} className="relative aspect-video bg-bg-tertiary rounded-lg overflow-hidden border border-border-primary group">
                    <img src={photo} alt="Delivery proof" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] text-white flex items-center gap-1 backdrop-blur-sm">
                      <Image size={10} /> {invoice.proofMetadata?.deliveryTimestamp.split('T')[0]}
                    </div>
                 </div>
               ))}
               <div className="relative aspect-video bg-bg-tertiary rounded-lg border border-border-primary flex flex-col items-center justify-center group cursor-pointer hover:bg-bg-hover">
                  <div className="w-12 h-12 rounded-full bg-bg-primary flex items-center justify-center mb-2 shadow-lg">
                    <Video className="text-accent-secondary" />
                  </div>
                  <span className="text-xs font-medium text-text-secondary">Watch Handover Video</span>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-bg-primary rounded-lg border border-border-primary flex items-center gap-3">
                <MapPin className="text-accent-info" />
                <div>
                  <p className="text-xs text-text-tertiary">GPS Location</p>
                  <p className="text-sm font-medium">{invoice.proofMetadata?.gpsLocation || 'Available after delivery'}</p>
                </div>
              </div>
              <div className="p-3 bg-bg-primary rounded-lg border border-border-primary flex items-center gap-3">
                 <FileText className="text-accent-warning" />
                 <div>
                   <p className="text-xs text-text-tertiary">Quality Report</p>
                   <p className="text-sm font-medium flex items-center gap-1 text-accent-success">
                     Passed <CheckCircle size={12} />
                   </p>
                 </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Status & Actions */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-sm font-semibold text-text-tertiary uppercase mb-4">Funding Status</h3>
            <div className="flex flex-col items-center justify-center py-6">
               <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="60" fill="transparent" stroke="#27272A" strokeWidth="8" />
                    <circle cx="64" cy="64" r="60" fill="transparent" stroke="#6366F1" strokeWidth="8" strokeDasharray="377" strokeDashoffset={invoice.status === 'FUNDED' ? 0 : 100} className="transition-all duration-1000 ease-out" />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-2xl font-bold">{invoice.status === 'FUNDED' ? '100' : '65'}%</span>
                  </div>
               </div>
               <p className="font-medium text-lg">{invoice.status === 'FUNDED' ? 'Funded by HDFC Bank' : 'Listing Live'}</p>
            </div>
            
            <div className="space-y-3 border-t border-border-primary pt-4 mt-2">
               <div className="flex justify-between text-sm">
                 <span className="text-text-secondary">Net Receivable</span>
                 <span className="font-mono">₹{(invoice.amount * 0.98).toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-sm">
                 <span className="text-text-secondary">Fee (Dynamic)</span>
                 <span className="font-mono text-accent-success">2.0%</span>
               </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-bg-secondary to-bg-tertiary">
            <h3 className="text-sm font-semibold text-text-tertiary uppercase mb-4">Dynamic Rate</h3>
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-primary mb-2">
              {invoice.discountRate}%
            </div>
            <p className="text-xs text-text-secondary mb-4">Current financing rate based on your risk profile and uploaded proof.</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Base Rate</span>
                <span>4.5%</span>
              </div>
              <div className="flex justify-between text-xs text-accent-success">
                <span>Buyer Credit</span>
                <span>-1.5%</span>
              </div>
              <div className="flex justify-between text-xs text-accent-success">
                <span>Proof Verified</span>
                <span>-0.9%</span>
              </div>
              <div className="h-px bg-border-primary my-2" />
              <div className="flex justify-between text-sm font-bold">
                <span>Final Rate</span>
                <span>{invoice.discountRate}%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}