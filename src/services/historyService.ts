import type { ProductAnalysis } from '../types';

const KEY = 'halallens_analysis_history_v1';
const MAX_ITEMS = 50;

const canUseStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage);

export const getHistory = (): ProductAnalysis[] => {
  if (!canUseStorage()) return [];

  try {
    const value = window.localStorage.getItem(KEY);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const setHistory = (items: ProductAnalysis[]) => {
  if (!canUseStorage()) return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
};

export const saveAnalysis = (analysis: ProductAnalysis) => {
  const next = [analysis, ...getHistory().filter((item) => item.id !== analysis.id)].slice(0, MAX_ITEMS);
  setHistory(next);
  return next;
};

export const deleteAnalysis = (id: string) => {
  const next = getHistory().filter((analysis) => analysis.id !== id);
  setHistory(next);
  return next;
};

export const clearHistory = () => {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(KEY);
};
