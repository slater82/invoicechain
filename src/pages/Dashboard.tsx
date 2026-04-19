import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  FileText, 
  IndianRupee, 
  Clock, 
  CheckCircle2,
  MoreHorizontal
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, Button, Badge } from '../components/ui/LayoutPrimitives';
import { MOCK_INVOICES, RECENT_ACTIVITY } from '../constants';

const chartData = [
  { name: 'Jan', value: 400000 },
  { name: 'Feb', value: 300000 },
  { name: 'Mar', value: 600000 },
  { name: 'Apr', value: 800000 },
  { name: 'May', value: 1250000 },
  { name: 'Jun', value: 950000 },
];

const pieData = [
  { name: 'Funded', value: 4, color: '#10B981' },
  { name: 'Pending', value: 2, color: '#F59E0B' },
  { name: 'Verified', value: 3, color: '#6366F1' },
  { name: 'Draft', value: 1, color: '#71717A' },
];

const StatCard = ({ title, value, trend, trendUp, icon: Icon }: any) => (
  <Card className="relative overflow-hidden">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-bg-tertiary rounded-lg border border-border-primary">
        <Icon size={20} className="text-accent-primary" />
      </div>
      {trend && (
        <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${trendUp ? 'text-accent-success bg-accent-success/10' : 'text-accent-error bg-accent-error/10'}`}>
          {trendUp ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
          {trend}
        </div>
      )}
    </div>
    <h3 className="text-text-secondary text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-text-primary mt-1">{value}</p>
    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-primary opacity-10 blur-2xl rounded-full" />
  </Card>
);

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary">Welcome back, Rajesh Kumar</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">Download Report</Button>
          <Button onClick={() => window.location.hash = '#/invoices/new'}>
            <span className="mr-2">+</span> Create Invoice
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Invoices" 
          value="142" 
          trend="+12.5%" 
          trendUp={true} 
          icon={FileText} 
        />
        <StatCard 
          title="Funded Amount" 
          value="₹45,20,000" 
          trend="+8.2%" 
          trendUp={true} 
          icon={IndianRupee} 
        />
        <StatCard 
          title="Pending Verification" 
          value="3" 
          trend="-2" 
          trendUp={true} 
          icon={Clock} 
        />
        <StatCard 
          title="Avg. Funding Rate" 
          value="1.8%" 
          trend="-0.2%" 
          trendUp={true} 
          icon={CheckCircle2} 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Funding Activity</h3>
            <div className="flex bg-bg-tertiary rounded-lg p-1">
              <button className="px-3 py-1 text-xs font-medium rounded bg-bg-secondary text-text-primary shadow-sm">6M</button>
              <button className="px-3 py-1 text-xs font-medium rounded text-text-secondary hover:text-text-primary">1Y</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                <XAxis dataKey="name" stroke="#71717A" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717A" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181B', borderColor: '#27272A', color: '#FAFAFA' }}
                  itemStyle={{ color: '#FAFAFA' }}
                />
                <Area type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="min-h-[400px]">
          <h3 className="text-lg font-semibold mb-6">Invoice Status</h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-3xl font-bold">10</span>
              <span className="text-xs text-text-tertiary">Total Active</span>
            </div>
          </div>
          <div className="space-y-3 mt-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-text-secondary">{item.name}</span>
                </div>
                <span className="font-mono font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity & Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Recent Invoices</h3>
            <Button variant="ghost" size="sm" onClick={() => window.location.hash = '#/invoices'}>View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-tertiary uppercase bg-bg-tertiary/50">
                <tr>
                  <th className="px-4 py-3 rounded-l-md">Invoice ID</th>
                  <th className="px-4 py-3">Buyer</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3 rounded-r-md">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-primary">
                {MOCK_INVOICES.map((inv) => (
                  <tr key={inv.id} className="hover:bg-bg-hover transition-colors cursor-pointer" onClick={() => window.location.hash = `#/invoices/${inv.id}`}>
                    <td className="px-4 py-3 font-medium text-accent-primary">{inv.invoiceNumber}</td>
                    <td className="px-4 py-3">{inv.buyerName}</td>
                    <td className="px-4 py-3 font-mono">₹{inv.amount.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3">
                      <Badge variant={
                        inv.status === 'FUNDED' ? 'success' : 
                        inv.status === 'PENDING_VERIFICATION' ? 'warning' : 'default'
                      }>
                        {inv.status.replace('_', ' ')}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-6">
            {RECENT_ACTIVITY.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className={`mt-1 p-2 rounded-full border ${
                  activity.type === 'FUNDING' ? 'bg-accent-success/10 border-accent-success/20 text-accent-success' : 
                  activity.type === 'SETTLEMENT' ? 'bg-accent-info/10 border-accent-info/20 text-accent-info' :
                  'bg-bg-tertiary border-border-primary text-text-secondary'
                }`}>
                  {activity.type === 'FUNDING' ? <IndianRupee size={16} /> : 
                   activity.type === 'UPLOAD' ? <FileText size={16} /> : 
                   <CheckCircle2 size={16} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{activity.description}</p>
                  <p className="text-xs text-text-tertiary mt-1">{activity.timestamp}</p>
                </div>
                {activity.amount && (
                  <div className="text-sm font-mono font-medium text-text-primary">
                    {activity.type === 'FUNDING' ? '+' : ''}₹{activity.amount.toLocaleString('en-IN')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
