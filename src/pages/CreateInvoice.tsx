import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import { Card, Button, Input } from '../components/ui/LayoutPrimitives';
import ProofMetadata from '../components/invoice/ProofMetadata';

const steps = [
    { id: 1, title: 'Invoice Details' },
    { id: 2, title: 'Buyer Info' },
    { id: 3, title: 'Line Items' },
    { id: 4, title: 'Proof Metadata' },
    { id: 5, title: 'Review' },
];

// Category -> items mapping (from user's table)
const CATEGORY_ITEMS: Record<string, string[]> = {
    Textiles: [
        'Cotton yarn',
        'Polyester fabric',
        'Viscose rayon',
        'Nylon thread',
        'Denim cloth',
        'Silk yarn',
        'Wool tops',
        'Synthetic fibers',
        'Cotton waste',
        'Dyes & pigments'
    ],
    'Metals/Engineering': [
        'Mild steel sheets',
        'MS rods',
        'GI pipes',
        'Aluminum sheets',
        'Brass rods',
        'Copper wires',
        'Stainless steel strips',
        'Cast iron scrap',
        'Zinc ingots',
        'Ferrous alloys'
    ],
    'Chemicals/Pharma': [
        'Caustic soda',
        'Soda ash',
        'Sulphuric acid',
        'Hydrogen peroxide',
        'Paints & resins',
        'Solvents (IPA)',
        'PVC resin',
        'Active pharma ingredients',
        'Packing gels',
        'Lab reagents'
    ],
    'Leather/Footwear': [
        'Raw hides',
        'Chrome tanned leather',
        'Vegetable tanned leather',
        'Shoe soles rubber',
        'PU leather sheets',
        'Thread for stitching',
        'Adhesives',
        'Buckles metal',
        'Eyelets',
        'Lining fabric'
    ],
    'Auto Components': [
        'Steel forgings',
        'Rubber bushes',
        'Brake linings',
        'Wires harness',
        'Bearings',
        'Gaskets',
        'Springs steel',
        'Castings iron',
        'Sheet metal blanks',
        'Fasteners'
    ],
    'Food Processing': [
        'Wheat flour',
        'Sugar bags',
        'Edible oils',
        'Spices powder',
        'Packaging films',
        'Tin containers',
        'Glass bottles',
        'Corrugated boxes',
        'Labels paper',
        'Preservatives'
    ],
    'Plastics/Rubber': [
        'HDPE granules',
        'PP granules',
        'Natural rubber',
        'Synthetic rubber',
        'PVC pipes raw',
        'Color masterbatch',
        'Moulding compounds',
        'Tires scrap',
        'Belts conveyor',
        'Hoses rubber'
    ],
    'Paper/Packaging': [
        'Kraft paper',
        'Duplex board',
        'Newsprint rolls',
        'Corrugated sheets',
        'Adhesives gum',
        'Printing inks',
        'Laminates',
        'Cartons blanks',
        'Labels rolls',
        'Wrapping films'
    ],
    'Others': [
        'Copper scrap',
        'PVC insulation',
        'Circuit boards raw',
        'Cement bags',
        'Lime powder',
        'Fly ash',
        'Sand coarse',
        'Aggregates',
        'Plywood sheets',
        'Timber logs',
        'Bone meal',
        'Coir fiber',
        'Jute bags',
        'Bamboo splits',
        'Clay bricks raw',
        'Glass cullet',
        'Ferro alloys',
        'Graphite powder',
        'Talc powder',
        'Mica flakes'
    ]
};

export default function CreateInvoice() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isProofComplete, setIsProofComplete] = useState(false);

    // Step 1 form data
    const [step1, setStep1] = useState({
        invoiceNumber: '',
        totalAmount: '',
        invoiceDate: '',
        dueDate: ''
    });

    // Step 2 form data
    const [step2, setStep2] = useState({
        gstin: '',
        companyName: '',
        email: ''
    });

    // Step 3 form data: each line item now includes category and item; qty is driven by single IoT value
    const [step3, setStep3] = useState({
        lineItems: [{ description: '', category: '', item: '', qty: '', price: '' }]
    });

    // IoT sensor simulation: single shared weight value for all line items
    const sensorIntervals = useRef<number | null>(null);
    const [sensorLive, setSensorLive] = useState(false);
    const [sharedSensorValue, setSharedSensorValue] = useState<string>(''); // kg

    const generateSensorWeight = (minKg = 50, maxQuintal = 1000) => {
        const maxKg = maxQuintal * 100; // 1000 quintal = 100000 kg
        const val = Math.random() * (maxKg - minKg) + minKg;
        return parseFloat(val.toFixed(2)); // kg with two decimals
    };

    // Set same weight across all line items
    const fetchSensorWeightAll = () => {
        const weightKg = String(generateSensorWeight());
        setSharedSensorValue(weightKg);
        setStep3((prev) => ({
            lineItems: prev.lineItems.map((li) => ({ ...li, qty: weightKg }))
        }));
    };

    // Toggle live updates for shared sensor value
    const toggleLiveSensorAll = () => {
        setSensorLive((prev) => {
            const next = !prev;
            if (next) {
                const id = window.setInterval(() => {
                    const weightKg = String(generateSensorWeight());
                    setSharedSensorValue(weightKg);
                    setStep3((prev) => ({
                        lineItems: prev.lineItems.map((li) => ({ ...li, qty: weightKg }))
                    }));
                }, 2000);
                sensorIntervals.current = id;
            } else {
                if (sensorIntervals.current !== null) {
                    clearInterval(sensorIntervals.current);
                    sensorIntervals.current = null;
                }
            }
            return next;
        });
    };

    useEffect(() => {
        return () => {
            if (sensorIntervals.current !== null) {
                clearInterval(sensorIntervals.current);
                sensorIntervals.current = null;
            }
        };
    }, []);

    // handle category -> reset item list value
    const handleCategoryChange = (idx: number, category: string) => {
        const items = CATEGORY_ITEMS[category] || [];
        const firstItem = items[0] || '';
        const newItems = [...step3.lineItems];
        newItems[idx] = { ...newItems[idx], category, item: firstItem };
        setStep3({ lineItems: newItems });
    };

    // basic validation functions (unchanged)
    const isStep1Valid = () => {
        return (
            step1.invoiceNumber.trim() !== '' &&
            step1.totalAmount.trim() !== '' &&
            step1.invoiceDate !== '' &&
            step1.dueDate !== '' &&
            parseFloat(step1.totalAmount) > 0
        );
    };

    const isStep2Valid = () => {
        return (
            step2.gstin.trim() !== '' &&
            step2.companyName.trim() !== '' &&
            step2.email.trim() !== '' &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(step2.email)
        );
    };

    const isStep3Valid = () => {
        // require every added line item to be fully filled and valid
        if (!Array.isArray(step3.lineItems) || step3.lineItems.length === 0) return false;
        return step3.lineItems.every((item) => {
            return (
                item.description.trim() !== '' &&
                item.category.trim() !== '' &&
                item.item.trim() !== '' &&
                String(item.qty).trim() !== '' &&
                String(item.price).trim() !== '' &&
                !isNaN(parseFloat(item.qty)) &&
                !isNaN(parseFloat(item.price)) &&
                parseFloat(item.qty) > 0 &&
                parseFloat(item.price) > 0
            );
        });
    };

    const isStep4Valid = () => isProofComplete;

    const isCurrentStepValid = () => {
        switch (currentStep) {
            case 1:
                return isStep1Valid();
            case 2:
                return isStep2Valid();
            case 3:
                return isStep3Valid();
            case 4:
                return isStep4Valid();
            case 5:
                return true;
            default:
                return false;
        }
    };

    const nextStep = () => {
        if (isCurrentStepValid()) {
            setCurrentStep((prev) => Math.min(prev + 1, 5));
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">Create New Invoice</h1>
                <p className="text-text-secondary">Upload invoice details and proof of delivery for verification.</p>
            </div>

            {/* Stepper */}
            <div className="flex justify-between items-center mb-10 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-bg-tertiary -z-10" />
                {steps.map((step) => (
                    <div key={step.id} className="flex flex-col items-center gap-2 bg-bg-primary px-2">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                                step.id < currentStep
                                    ? 'bg-accent-success text-white'
                                    : step.id === currentStep
                                    ? 'bg-accent-primary text-white shadow-glow'
                                    : 'bg-bg-tertiary text-text-tertiary border border-border-secondary'
                            }`}
                        >
                            {step.id < currentStep ? <Check size={18} /> : step.id}
                        </div>
                        <span className={`text-xs font-medium ${step.id === currentStep ? 'text-accent-primary' : 'text-text-tertiary'}`}>
                            {step.title}
                        </span>
                    </div>
                ))}
            </div>

            <Card className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h2 className="text-xl font-semibold mb-6">Basic Invoice Details</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Invoice Number *</label>
                                    <Input value={step1.invoiceNumber} onChange={(e) => setStep1({ ...step1, invoiceNumber: e.target.value })} placeholder="INV-2024-001" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Total Amount (INR) *</label>
                                    <Input type="number" value={step1.totalAmount} onChange={(e) => setStep1({ ...step1, totalAmount: e.target.value })} placeholder="₹ 0.00" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Invoice Date *</label>
                                    <Input type="date" value={step1.invoiceDate} onChange={(e) => setStep1({ ...step1, invoiceDate: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Due Date *</label>
                                    <Input type="date" value={step1.dueDate} onChange={(e) => setStep1({ ...step1, dueDate: e.target.value })} />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h2 className="text-xl font-semibold mb-6">Buyer Information</h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Buyer GSTIN *</label>
                                    <div className="flex gap-2">
                                        <Input value={step2.gstin} onChange={(e) => setStep2({ ...step2, gstin: e.target.value })} placeholder="27AA..." />
                                        <Button variant="outline">Verify</Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Company Name *</label>
                                    <Input value={step2.companyName} onChange={(e) => setStep2({ ...step2, companyName: e.target.value })} placeholder="Search company..." />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email for Verification *</label>
                                    <Input type="email" value={step2.email} onChange={(e) => setStep2({ ...step2, email: e.target.value })} placeholder="accountspayable@company.com" />
                                    <p className="text-xs text-text-tertiary">We will send a collaborative verification link to this email.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h2 className="text-xl font-semibold mb-6">Line Items *</h2>
                            <div className="border border-border-primary rounded-lg overflow-hidden mb-4">
                                <table className="w-full text-sm">
                                    <thead className="bg-bg-tertiary">
                                        <tr>
                                            <th className="px-4 py-2 text-left">Description</th>
                                            <th className="px-4 py-2 text-left">Category</th>
                                            <th className="px-4 py-2 text-left">Item</th>
                                            <th className="px-4 py-2 text-right">Qty (kg) — shared</th>
                                            <th className="px-4 py-2 text-right">Price</th>
                                            <th className="px-4 py-2 text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {step3.lineItems.map((item, idx) => (
                                            <tr key={idx} className="border-b border-border-primary">
                                                <td className="px-4 py-2 w-48">
                                                    <Input
                                                        className="h-8"
                                                        value={item.description}
                                                        onChange={(e) => {
                                                            const newItems = [...step3.lineItems];
                                                            newItems[idx].description = e.target.value;
                                                            setStep3({ lineItems: newItems });
                                                        }}
                                                        placeholder="Item name"
                                                    />
                                                </td>

                                                <td className="px-4 py-2">
                                                    <select
                                                        className="h-8 w-full rounded border bg-bg-primary px-2"
                                                        value={item.category}
                                                        onChange={(e) => handleCategoryChange(idx, e.target.value)}
                                                    >
                                                        <option value="">Select category</option>
                                                        {Object.keys(CATEGORY_ITEMS).map((cat) => (
                                                            <option key={cat} value={cat}>
                                                                {cat}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>

                                                <td className="px-4 py-2">
                                                    <select
                                                        className="h-8 w-full rounded border bg-bg-primary px-2"
                                                        value={item.item}
                                                        onChange={(e) => {
                                                            const newItems = [...step3.lineItems];
                                                            newItems[idx].item = e.target.value;
                                                            setStep3({ lineItems: newItems });
                                                        }}
                                                    >
                                                        <option value="">Select item</option>
                                                        {(CATEGORY_ITEMS[item.category] || []).map((it) => (
                                                            <option key={it} value={it}>
                                                                {it}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>

                                                <td className="px-4 py-2">
                                                    <div className="flex items-center gap-2 justify-end">
                                                        <Input
                                                            className="h-8 w-32 text-right"
                                                            type="number"
                                                            value={item.qty}
                                                            readOnly
                                                            placeholder="0"
                                                        />
                                                        <div className="flex gap-1">
                                                            <Button size="sm" variant="outline" onClick={fetchSensorWeightAll}>
                                                                Fetch
                                                            </Button>
                                                            <Button size="sm" variant={sensorLive ? 'destructive' : 'ghost'} onClick={toggleLiveSensorAll}>
                                                                {sensorLive ? 'Live On' : 'Live Off'}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-text-tertiary mt-1">Sensor range: 50 kg — 1000 quintal (simulated)</p>
                                                </td>

                                                <td className="px-4 py-2">
                                                    <Input
                                                        className="h-8 text-right"
                                                        type="number"
                                                        value={item.price}
                                                        onChange={(e) => {
                                                            const newItems = [...step3.lineItems];
                                                            newItems[idx].price = e.target.value;
                                                            setStep3({ lineItems: newItems });
                                                        }}
                                                        placeholder="0.00"
                                                    />
                                                </td>

                                                <td className="px-4 py-2 text-right font-mono">₹{(parseFloat(item.qty || '0') * parseFloat(item.price || '0')).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="p-2 bg-bg-hover text-center">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full text-accent-primary"
                                        onClick={() =>
                                            setStep3({
                                                lineItems: [...step3.lineItems, { description: '', category: '', item: '', qty: sharedSensorValue, price: '' }]
                                            })
                                        }
                                    >
                                        + Add Item
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <ProofMetadata setIsProofComplete={setIsProofComplete} />
                        </motion.div>
                    )}

                    {currentStep === 5 && (
                        <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h2 className="text-xl font-semibold mb-6">Review & Submit</h2>
                            <div className="bg-bg-tertiary/50 rounded-lg p-6 mb-6 border border-border-primary">
                                <div className="flex justify-between mb-4">
                                    <span className="text-text-secondary">Risk Grade Estimate</span>
                                    <span className="text-xl font-bold text-emerald-400">A</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-text-secondary">Expected Funding Rate</span>
                                    <span className="font-mono">1.8% - 2.2%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">Potential Payout</span>
                                    <span className="font-mono text-white">₹ 12,25,000</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-accent-info/5 rounded-lg border border-accent-info/20 mb-6">
                                <AlertCircle className="text-accent-info shrink-0 mt-0.5" size={18} />
                                <p className="text-sm text-text-secondary">
                                    By submitting, this invoice will be hashed on Polygon Mainnet. Collaborative verification request will be sent to the buyer automatically.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-between mt-8 pt-6 border-t border-border-primary">
                    <Button variant="ghost" onClick={prevStep} disabled={currentStep === 1}>
                        Back
                    </Button>
                    <Button
                        onClick={currentStep === 5 ? async () => {
                            if (!isCurrentStepValid()) return;
                            // assemble payload
                            const payload = {
                                engineerId: 'ENG-LOCAL',
                                warehouseId: step2.gstin || 'WH-UNKNOWN',
                                location: step2.companyName || 'Unknown',
                                sensorData: { sharedSensorValue },
                                result: {
                                    step1,
                                    step2,
                                    lineItems: step3.lineItems
                                }
                            };

                            try {
                                const res = await fetch('/api/inspection/create', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(payload)
                                });
                                if (!res.ok) throw new Error('Server error');
                                const data = await res.json();
                                alert('Submitted: ' + (data.message || 'OK'));
                            } catch (err) {
                                console.error(err);
                                alert('Failed to submit. Check console and server logs.');
                            }
                        } : nextStep}
                        disabled={!isCurrentStepValid()}
                        title={!isCurrentStepValid() ? `Fill all required fields in Step ${currentStep}` : undefined}
                    >
                        {currentStep === 5 ? 'Submit' : 'Continue'}
                    </Button>
                </div>
            </Card>
        </div>
    );
}