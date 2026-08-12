import type { HalalStatus, ProductAnalysis } from '../types';
import { analyzeIngredient, parseIngredients, statusLabel } from './ingredientService';

export function strictStatus(statuses: HalalStatus[]): HalalStatus {
  if (statuses.includes('NOT_HALAL')) return 'NOT_HALAL';
  if (statuses.includes('NEEDS_VERIFICATION')) return 'NEEDS_VERIFICATION';
  return 'HALAL';
}

const makeId = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `analysis-${Date.now()}`);

export function createAnalysis(rawIngredients: string, productName = 'Manual analysis', extras: Partial<ProductAnalysis> = {}): ProductAnalysis {
  const ingredients = parseIngredients(rawIngredients).map(analyzeIngredient);

  if (!ingredients.length) {
    throw new Error('Enter at least one ingredient before creating an analysis.');
  }

  const overallStatus = strictStatus(ingredients.map((ingredient) => ingredient.status));
  const decisiveIngredients = ingredients.filter((ingredient) => ingredient.status === overallStatus);
  const confidence = Math.min(...decisiveIngredients.map((ingredient) => ingredient.confidence));
  const needsReview = ingredients.filter((ingredient) => ingredient.status !== 'HALAL');

  return {
    id: makeId(),
    createdAt: new Date().toISOString(),
    productName: productName.trim() || 'Manual analysis',
    rawIngredients,
    overallStatus,
    confidence: Number.isFinite(confidence) ? confidence : 0.4,
    ingredients,
    why: needsReview.length
      ? needsReview.map((ingredient) => `${ingredient.input}: ${statusLabel(ingredient.status)} — ${ingredient.reason}`)
      : ['All recognized ingredients are baseline halal in this demo database.'],
    whatToCheck: [...new Set(needsReview.flatMap((ingredient) => ingredient.checkFor))],
    ...extras,
  };
}
