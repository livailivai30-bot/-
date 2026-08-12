export type HalalStatus = 'HALAL' | 'NOT_HALAL' | 'NEEDS_VERIFICATION';
export interface IngredientRecord { id:string; name:string; status:HalalStatus; aliases:string[]; category:string; summary:string; checkFor:string[]; sources:string[]; confidence:number; }
export interface IngredientAnalysis { input:string; normalized:string; status:HalalStatus; confidence:number; record?:IngredientRecord; reason:string; checkFor:string[]; }
export interface ProductAnalysis { id:string; createdAt:string; productName:string; brand?:string; barcode?:string; imageDataUrl?:string; rawIngredients:string; overallStatus:HalalStatus; confidence:number; ingredients:IngredientAnalysis[]; why:string[]; whatToCheck:string[]; }
export interface DemoProduct { id:string; name:string; brand:string; barcode:string; ingredients:string; image?:string; }
export interface SearchFilters { query:string; status?:HalalStatus | 'ALL'; }
