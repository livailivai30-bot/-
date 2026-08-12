import type { PropsWithChildren } from 'react';
import { statusLabel } from '../services/ingredientService';
import type { HalalStatus } from '../types';
export function Badge({status}:{status:HalalStatus}){ const c={HALAL:'bg-emerald-100 text-emerald-800',NOT_HALAL:'bg-red-100 text-red-800',NEEDS_VERIFICATION:'bg-amber-100 text-amber-800'}[status]; return <span className={`rounded-full px-3 py-1 text-sm font-semibold ${c}`}>{statusLabel(status)}</span> }
export function Card({children,className=''}:PropsWithChildren<{className?:string}>){return <section className={`glass rounded-3xl border border-emerald-100 p-5 shadow-sm ${className}`}>{children}</section>}
export function Empty({title,body}:{title:string;body:string}){return <Card><h3 className="font-bold">{title}</h3><p className="text-slate-600">{body}</p></Card>}
export function Disclaimer(){return <p className="text-xs text-slate-500">Demo guidance only; always verify with qualified scholars, certifiers, manufacturers, and product labels.</p>}
export function Modal({title,onClose,children}:PropsWithChildren<{title:string;onClose:()=>void}>){return <div className="fixed inset-0 z-20 grid place-items-center bg-black/40 p-4"><Card className="max-w-lg"><div className="flex justify-between gap-4"><h2 className="text-xl font-bold">{title}</h2><button onClick={onClose}>Close</button></div>{children}</Card></div>}
