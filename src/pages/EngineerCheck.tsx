import React, { useState } from 'react';
import './engineer.css';


export default function EngineerCheck() {
  const [engineerId, setEngineerId] = useState('');
  const [warehouseId, setWarehouseId] = useState('');
  const [location, setLocation] = useState('');
  const [rawMaterial, setRawMaterial] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [quality, setQuality] = useState('Good');
  const [vendorName, setVendorName] = useState('');
  const [vendorContact, setVendorContact] = useState('');
  const [temperature, setTemperature] = useState<number | ''>('');
  const [humidity, setHumidity] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [videos, setVideos] = useState<FileList | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [blockchainHash, setBlockchainHash] = useState<string | null>(null);
  const inputStyle = {
  color: '#000000e8',
  backgroundColor: '#d13c3c'
};

  async function filesToDataURLs(files: FileList | null) {
    if (!files) return [];
    const arr = Array.from(files);
    const results = await Promise.all(
      arr.map(
        (f) =>
          new Promise((res) => {
            const reader = new FileReader();
            reader.onload = () => res({ name: f.name, type: f.type, data: reader.result });
            reader.onerror = () => res(null);
            reader.readAsDataURL(f);
          })
      )
    );
    return results.filter(Boolean);
  }
async function generateHash(data: any) {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(JSON.stringify(data));
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Uploading...');

    const photoData = await filesToDataURLs(photos);
    const videoData = await filesToDataURLs(videos);

    const payload = {
      engineerId,
      warehouseId,
      location,
      sensorData: {
        temperature: temperature === '' ? null : Number(temperature),
        humidity: humidity === '' ? null : Number(humidity),
        weight: weight === '' ? null : Number(weight)
      },
      result: {
        rawMaterial,
        quantity: quantity === '' ? null : Number(quantity),
        quality,
        vendor: { name: vendorName, contact: vendorContact },
        notes,
        media: { photos: photoData, videos: videoData }
      }
    };
const hash = await generateHash(payload);
setBlockchainHash(hash);

    try {
      const res = await fetch('/api/inspection/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');
      setStatus('Submitted ✓');
    } catch (err: any) {
      setStatus('Error: ' + (err.message || err));
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <h1>Engineer Inspection — Submit Check</h1>
      <form onSubmit={handleSubmit} className="engineer-form">

        <label>Engineer ID<br />
          <input value={engineerId} onChange={(e) => setEngineerId(e.target.value)} required />
        </label>

        <br />
        <label>Warehouse ID<br />
          <input value={warehouseId} onChange={(e) => setWarehouseId(e.target.value)} required />
        </label>

        <br />
        <label>Location<br />
          <input value={location} onChange={(e) => setLocation(e.target.value)} required />
        </label>

        <br />
        <label>Raw material type<br />
          <input value={rawMaterial} onChange={(e) => setRawMaterial(e.target.value)} />
        </label>

        <br />
        <label>Quantity<br />
          <input type="number" value={quantity as any} onChange={(e) => setQuantity(e.target.value === '' ? '' : Number(e.target.value))} />
        </label>

        <br />
        <label>Quality<br />
          <select value={quality} onChange={(e) => setQuality(e.target.value)}>
            <option>Good</option>
            <option>Acceptable</option>
            <option>Poor</option>
          </select>
        </label>

        <br />
        <fieldset style={{ marginTop: 8 }}>
          <legend>Vendor</legend>
          <label>Name<br />
            <input value={vendorName} onChange={(e) => setVendorName(e.target.value)} />
          </label>
          <br />
          <label>Contact<br />
            <input value={vendorContact} onChange={(e) => setVendorContact(e.target.value)} />
          </label>
        </fieldset>

        <br />
        <fieldset>
          <legend>Sensor data (truck / storage)</legend>
          <label>Temperature (°C)<br />
            <input type="number" value={temperature as any} onChange={(e) => setTemperature(e.target.value === '' ? '' : Number(e.target.value))} />
          </label>
          <br />
          <label>Humidity (%)<br />
            <input type="number" value={humidity as any} onChange={(e) => setHumidity(e.target.value === '' ? '' : Number(e.target.value))} />
          </label>
          <br />
          <label>Weight (kg)<br />
            <input type="number" value={weight as any} onChange={(e) => setWeight(e.target.value === '' ? '' : Number(e.target.value))} />
          </label>
        </fieldset>

        <br />
        <label>Notes<br />
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} />
        </label>

        <br />
        <label>Photos (multiple)<br />
          <input type="file" accept="image/*" multiple onChange={(e) => setPhotos(e.target.files)} />
        </label>

        <br />
        <label>Videos (optional)<br />
          <input type="file" accept="video/*" multiple onChange={(e) => setVideos(e.target.files)} />
        </label>

        <br />
        <button type="submit">Submit Inspection</button>
      </form>

      {status && <p style={{ marginTop: 12 }}>{status}</p>}
      

{blockchainHash && (
  <div
    style={{
      marginTop: 16,
      padding: 12,
      borderRadius: 8,
      border: '1px solid #22c55e',
      background: 'rgba(23, 211, 92, 0.1)'
    }}
  >
    <p style={{ fontWeight: 600, color: '#22c55e' }}>
      ✅ Inspection Stored on Blockchain (Demo)
    </p>
    <p style={{ fontSize: 12, wordBreak: 'break-all' }}>
      Hash: {blockchainHash}
    </p>
    <p style={{ fontSize: 12 }}>
      Network: Polygon (Demo)
    </p>
  </div>
)}

</div>
);
}
