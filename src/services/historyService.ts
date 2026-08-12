import type { ProductAnalysis } from '../types';
const KEY='halal_analysis_history_v1';
export const getHistory=():ProductAnalysis[]=>JSON.parse(localStorage.getItem(KEY) ?? '[]');
export const saveAnalysis=(a:ProductAnalysis)=>{ const next=[a,...getHistory().filter(x=>x.id!==a.id)].slice(0,50); localStorage.setItem(KEY,JSON.stringify(next)); return next; };
export const deleteAnalysis=(id:string)=>{ const next=getHistory().filter(a=>a.id!==id); localStorage.setItem(KEY,JSON.stringify(next)); return next; };
export const clearHistory=()=>localStorage.removeItem(KEY);
