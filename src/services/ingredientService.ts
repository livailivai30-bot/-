import { ingredientDatabase } from '../data/ingredientDatabase';
import type { HalalStatus, IngredientAnalysis, IngredientRecord, SearchFilters } from '../types';
export const normalize = (v:string) => v.toLowerCase().replace(/[()]/g,' ').replace(/\s+/g,' ').trim();
export const parseIngredients = (raw:string) => raw.split(/[,;\n]+/).map(s=>s.trim()).filter(Boolean);
export const findIngredient = (term:string): IngredientRecord | undefined => { const n=normalize(term); return ingredientDatabase.find(r=>normalize(r.name)===n || r.aliases.some(a=>n.includes(normalize(a)) || normalize(a).includes(n))); };
export const analyzeIngredient = (input:string): IngredientAnalysis => { const record=findIngredient(input); if(record) return {input,normalized:normalize(input),status:record.status,confidence:record.confidence,record,reason:record.summary,checkFor:record.checkFor}; return {input,normalized:normalize(input),status:'NEEDS_VERIFICATION',confidence:.35,reason:'Not found in the demo database; confidence cannot resolve an unknown origin.',checkFor:['Manufacturer confirmation','Halal certification']}; };
export const searchIngredients = ({query,status='ALL'}:SearchFilters): IngredientRecord[] => { const q=normalize(query); return ingredientDatabase.filter(r=>(status==='ALL'||r.status===status) && (!q || [r.name,r.category,r.summary,...r.aliases].some(v=>normalize(v).includes(q)))); };
export const statusLabel = (s:HalalStatus) => s==='HALAL'?'Halal':s==='NOT_HALAL'?'Not halal':'Needs verification';
