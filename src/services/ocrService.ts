export interface OcrResult { text:string; confidence:number; note:string }
export async function mockOcr(_file:File): Promise<OcrResult> { await new Promise(r=>setTimeout(r,700)); return {text:'Wheat flour, sugar, E471, enzymes, natural flavors',confidence:.62,note:'Mock OCR result. Configure a server-side OCR provider for production.'}; }
export const getOcrConfigStatus=()=> import.meta.env.VITE_OCR_ENDPOINT ? 'OCR endpoint configured for future integration.' : 'External OCR is not configured; using mock OCR only.';
