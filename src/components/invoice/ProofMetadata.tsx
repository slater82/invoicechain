import { useState } from 'react';
import { Card, Button, Input, Badge } from '../ui/LayoutPrimitives';

type ProofMetadataProps = {
  setIsProofComplete: (value: boolean) => void;
};

export default function ProofMetadata({
  setIsProofComplete,
}: ProofMetadataProps) {
  const [metadata, setMetadata] = useState({
    invoiceHash: '',
    buyerPAN: '',
    gstNumber: '',
    timestamp: '',
    file: null as File | null,
  });

  const generateMetadata = () => {
    const data = {
      ...metadata,
      invoiceHash: `INV-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    setMetadata(data);

    //  parent ko signal: step complete
    if (data.buyerPAN && data.gstNumber && data.file) {
      setIsProofComplete(true);
    }
  };

  return (
    <Card>
      <h2 style={{ fontWeight: 'bold', marginBottom: '8px' }}>
        Proof Metadata
      </h2>

      {/* File Upload */}
      <Input
        type="file"
        accept=".pdf,image/*"
        onChange={(e) =>
          setMetadata({
            ...metadata,
            file: e.target.files?.[0] || null,
          })
        }
      />
      <p>Upload Invoice / Proof (PDF or Image)</p>

      {/* Buyer PAN */}
      <Input
        placeholder="Buyer PAN"
        value={metadata.buyerPAN}
        onChange={(e) =>
          setMetadata({ ...metadata, buyerPAN: e.target.value })
        }
      />

      {/* GST Number */}
      <Input
        placeholder="GST Number"
        value={metadata.gstNumber}
        onChange={(e) =>
          setMetadata({ ...metadata, gstNumber: e.target.value })
        }
      />

      {/* Generate */}
      <Button onClick={generateMetadata}>
        Generate Metadata
      </Button>

      {/* Result */}
      {metadata.invoiceHash && (
        <div style={{ marginTop: '12px' }}>
          <Badge>Invoice Hash</Badge>
          <p>{metadata.invoiceHash}</p>

          <Badge>Timestamp</Badge>
          <p>{metadata.timestamp}</p>
        </div>
      )}
    </Card>
  );
}
