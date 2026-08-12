import type { PropsWithChildren } from 'react';
import { statusLabel } from '../services/ingredientService';
import type { HalalStatus } from '../types';

export function Badge({ status }: { status: HalalStatus }) {
  const color = {
    HALAL: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
    NOT_HALAL: 'bg-red-100 text-red-800 ring-red-200',
    NEEDS_VERIFICATION: 'bg-amber-100 text-amber-900 ring-amber-200',
  }[status];

  return <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ring-1 ${color}`}>{statusLabel(status)}</span>;
}

export function Button({ children, variant = 'primary', ...props }: PropsWithChildren<{ variant?: 'primary' | 'secondary' | 'danger'; onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean }>) {
  const styles = {
    primary: 'bg-emerald-700 text-white hover:bg-emerald-800',
    secondary: 'border border-emerald-200 bg-white text-emerald-900 hover:bg-emerald-50',
    danger: 'border border-red-200 bg-white text-red-700 hover:bg-red-50',
  }[variant];

  return <button className={`rounded-xl px-4 py-2 font-semibold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${styles}`} {...props}>{children}</button>;
}

export function Card({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <section className={`glass rounded-3xl border border-emerald-100 p-5 shadow-sm ${className}`}>{children}</section>;
}

export function Empty({ title, body }: { title: string; body: string }) {
  return <Card><h3 className="font-bold text-slate-900">{title}</h3><p className="mt-1 text-slate-600">{body}</p></Card>;
}

export function Disclaimer() {
  return <p className="text-xs leading-5 text-slate-500">HalalLens is a demo decision-support tool, not a religious ruling. Always verify labels, manufacturers, halal certifiers, and qualified scholars.</p>;
}

export function Modal({ title, onClose, children }: PropsWithChildren<{ title: string; onClose: () => void }>) {
  return <div className="fixed inset-0 z-20 grid place-items-center bg-black/50 p-4" role="dialog" aria-modal="true"><Card className="max-h-[90vh] w-full max-w-lg overflow-auto"><div className="mb-4 flex items-center justify-between gap-4"><h2 className="text-xl font-bold">{title}</h2><Button variant="secondary" onClick={onClose}>Close</Button></div>{children}</Card></div>;
}
