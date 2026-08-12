import { demoProducts } from '../data/demoProducts';
import { createAnalysis } from './analysisService';
import { normalize } from './ingredientService';
export const searchProducts=(q:string)=>{ const n=normalize(q); return demoProducts.map(p=>({...p,analysis:createAnalysis(p.ingredients,p.name,{brand:p.brand,barcode:p.barcode})})).filter(p=>!n || [p.name,p.brand,p.barcode,p.ingredients].some(v=>normalize(v).includes(n))); };
