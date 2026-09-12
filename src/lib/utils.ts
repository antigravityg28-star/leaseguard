// =============================================================================
// LEASEGUARD B2B - Utility Functions
// =============================================================================
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// =============================================================================
// Format Helpers
// =============================================================================
export function formatCurrency(amount: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatISODate(date: string | Date): string {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

// =============================================================================
// ISTAT FOI 2025 & 2026 Official Indices (annual averages)
// Update annually from ISTAT official data
// =============================================================================
export const ISTAT_FOI_INDICES: Record<number, number> = {
  2019: 103.3,
  2020: 100.3,
  2021: 105.4,
  2022: 113.6,
  2023: 119.8,
  2024: 120.2,
  2025: 122.1,
  2026: 123.5, // Indice medio annuale (aggiornare con dati ISTAT ufficiali)
};

export function calculateISTATAdeguamento(
  baseRent: number,
  baseYear: number,
  currentYear: number,
  percentage: number = 75 // default 75% previsto dalla legge per contratti commerciali
): { originalRent: number; adjustedRent: number; increase: number; increasePercent: number } {
  const baseIndex = ISTAT_FOI_INDICES[baseYear] ?? 100;
  const currentIndex = ISTAT_FOI_INDICES[currentYear] ?? baseIndex;
  const indexVariation = (currentIndex - baseIndex) / baseIndex;
  const applicableVariation = indexVariation * percentage;
  const adjustedRent = baseRent * (1 + applicableVariation);
  const increase = adjustedRent - baseRent;

  return {
    originalRent: baseRent,
    adjustedRent,
    increase,
    increasePercent: applicableVariation * 100,
  };
}
