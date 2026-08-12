import { useState } from 'react';
import { Button, Card } from '../components/ui';
import { createAnalysis } from '../services/analysisService';
import { scanBarcode } from '../services/barcodeService';
import { saveAnalysis } from '../services/historyService';
import { getOcrConfigStatus, mockOcr } from '../services/ocrService';
import type { ProductAnalysis } from '../types';

const isImage = (file: File) => file.type.startsWith('image/');

export default function Analyze({ done }: { done: (analysis: ProductAnalysis) => void }) {
  const [imagePreview, setImagePreview] = useState<string>();
  const [rawIngredients, setRawIngredients] = useState('');
  const [productName, setProductName] = useState('');
  const [error, setError] = useState('');
  const [loadingStep, setLoadingStep] = useState('');

  const handleFile = async (file?: File) => {
    if (!file) return;
    if (!isImage(file)) {
      setError('Please upload a valid image file such as PNG, JPG, or WebP.');
      return;
    }

    setError('');
    setImagePreview(URL.createObjectURL(file));
    setLoadingStep('Reading label with mock OCR...');
    try {
      const ocrResult = await mockOcr(file);
      setRawIngredients(ocrResult.text);
      setLoadingStep(ocrResult.note);
    } catch {
      setError('Mock OCR failed. Please type the ingredients manually.');
      setLoadingStep('');
    }
  };

  const submit = async () => {
    if (!rawIngredients.trim()) {
      setError('Enter ingredients or upload an image first.');
      return;
    }

    setError('');
    try {
      for (const step of ['Parsing ingredients', 'Matching aliases', 'Applying strict halal status']) {
        setLoadingStep(step);
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
      const analysis = createAnalysis(rawIngredients, productName, { imageDataUrl: imagePreview });
      saveAnalysis(analysis);
      done(analysis);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Analysis failed. Please check the ingredients and try again.');
    } finally {
      setLoadingStep('');
    }
  };

  const removeImage = () => {
    setImagePreview(undefined);
    setLoadingStep('Image removed. Manual ingredients are still available.');
  };

  return <Card><div className="space-y-4"><div><h1 className="text-3xl font-bold text-slate-950">Analyze</h1><p className="text-sm text-slate-500">{getOcrConfigStatus()}</p></div><div onDrop={(event: DragEvent) => { event.preventDefault(); void handleFile(event.dataTransfer?.files[0]); }} onDragOver={(event: DragEvent) => event.preventDefault()} className="rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 p-6 text-center"><input type="file" accept="image/*" onChange={(event: Event) => void handleFile((event.target as HTMLInputElement).files?.[0])} /><p className="mt-2 text-sm text-slate-600">Drag/drop a label image or choose a file.</p></div>{imagePreview && <div className="space-y-2"><img src={imagePreview} className="max-h-56 max-w-full rounded-xl border object-contain" alt="Uploaded ingredient label preview" /><Button variant="secondary" onClick={removeImage}>Remove image</Button></div>}<input className="w-full rounded-xl border border-slate-200 p-3" placeholder="Product name" value={productName} onChange={(event: Event) => setProductName((event.target as HTMLInputElement).value)} /><textarea className="h-36 w-full rounded-xl border border-slate-200 p-3" placeholder="Manual ingredients" value={rawIngredients} onChange={(event: Event) => setRawIngredients((event.target as HTMLTextAreaElement).value)} />{error && <p className="rounded-xl bg-red-50 p-3 text-red-700">{error}</p>}{loadingStep && <p className="rounded-xl bg-amber-50 p-3 text-amber-800">{loadingStep}</p>}<div className="flex flex-wrap gap-2"><Button onClick={submit}>Create result</Button><Button variant="secondary" onClick={() => void scanBarcode().catch((caught) => alert(caught instanceof Error ? caught.message : 'Barcode scanner unavailable.'))}>Check scanner availability</Button></div></div></Card>;
}
