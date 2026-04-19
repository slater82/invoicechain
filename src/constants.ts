import { Invoice, Activity, User } from '../types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Rajesh Kumar',
  companyName: 'Precision Auto Components Pvt Ltd',
  role: 'MSME',
  walletAddress: '0x71C...9A23',
  gstin: '27AABCT1234A1Z5'
};

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv_1',
    invoiceNumber: 'INV-2024-001',
    msmeName: 'Precision Auto Components Pvt Ltd',
    buyerName: 'Tata Motors Limited',
    amount: 1250000,
    date: '2024-05-10',
    dueDate: '2024-08-10',
    status: 'FUNDED',
    riskGrade: 'A+',
    verificationScore: 98,
    discountRate: 1.8,
    items: [
      { id: '1', description: 'Hydraulic Pumps Model X2', quantity: 50, unitPrice: 25000, total: 1250000 }
    ],
    proofMetadata: {
      deliveryPhotos: ['https://picsum.photos/400/300?random=1', 'https://picsum.photos/400/300?random=2'],
      deliveryTimestamp: '2024-05-12T14:30:00Z',
      qualityCheckPassed: true,
      gpsLocation: 'Pune, MH'
    }
  },
  {
    id: 'inv_2',
    invoiceNumber: 'INV-2024-004',
    msmeName: 'Precision Auto Components Pvt Ltd',
    buyerName: 'Mahindra & Mahindra Ltd',
    amount: 875000,
    date: '2024-05-15',
    dueDate: '2024-08-15',
    status: 'LISTED',
    riskGrade: 'A',
    verificationScore: 92,
    discountRate: 2.1,
    items: [
      { id: '1', description: 'Transmission Gears Set', quantity: 100, unitPrice: 8750, total: 875000 }
    ],
    proofMetadata: {
      deliveryPhotos: ['https://picsum.photos/400/300?random=3'],
      deliveryTimestamp: '2024-05-16T10:15:00Z',
      qualityCheckPassed: true
    }
  },
  {
    id: 'inv_3',
    invoiceNumber: 'INV-2024-008',
    msmeName: 'Precision Auto Components Pvt Ltd',
    buyerName: 'Bajaj Auto Ltd',
    amount: 345000,
    date: '2024-05-20',
    dueDate: '2024-08-20',
    status: 'PENDING_VERIFICATION',
    riskGrade: 'B+',
    verificationScore: 75,
    discountRate: 0,
    items: [],
  },
  {
    id: 'inv_4',
    invoiceNumber: 'INV-2024-012',
    msmeName: 'Precision Auto Components Pvt Ltd',
    buyerName: 'Ashok Leyland',
    amount: 2100000,
    date: '2024-05-22',
    dueDate: '2024-09-22',
    status: 'DRAFT',
    riskGrade: 'A',
    verificationScore: 0,
    discountRate: 0,
    items: [],
  }
];

export const RECENT_ACTIVITY: Activity[] = [
  { id: 'a1', type: 'FUNDING', description: 'Received funding for INV-2024-001 from HDFC Bank', timestamp: '2 hours ago', amount: 1227500 },
  { id: 'a2', type: 'VERIFICATION', description: 'Mahindra & Mahindra verified INV-2024-004', timestamp: '1 day ago' },
  { id: 'a3', type: 'UPLOAD', description: 'Uploaded proof metadata for INV-2024-008', timestamp: '2 days ago' },
  { id: 'a4', type: 'SETTLEMENT', description: 'Settlement received for INV-2023-098', timestamp: '5 days ago', amount: 450000 },
];
