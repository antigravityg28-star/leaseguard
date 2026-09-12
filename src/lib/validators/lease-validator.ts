// =============================================================================
// LEASEGUARD B2B - Flexible & Resilient Zod Validators
// =============================================================================
import { z } from "zod";

export const createLeaseSchema = z.object({
  code: z.string().default("LG-MIL-01"),
  property_name: z.string().min(1, "Inserisci il nome dell'immobile o insegna"),
  property_address: z.string().optional().or(z.literal("")),
  property_city: z.string().optional().or(z.literal("")),
  property_province: z.string().optional().or(z.literal("")),
  property_cap: z.string().optional().or(z.literal("")),
  property_type: z.string().default("shop"),
  landlord_name: z.string().optional().or(z.literal("")),
  landlord_address: z.string().optional().or(z.literal("")),
  landlord_pec: z.string().optional().or(z.literal("")),
  lease_start_date: z.string().optional().or(z.literal("")),
  lease_end_date: z.string().optional().or(z.literal("")),
  base_rent_monthly: z.any().default(0),
  rent_percentage: z.boolean().default(false),
  percentage_breakpoint: z.any().default(0),
  percentage_rate: z.any().default(0),
  is_statute_indexed: z.boolean().default(true),
  index_percentage: z.any().default(75),
  base_index_year: z.any().default(2024),
  cam_expenses_monthly: z.any().default(0),
  deposit_amount: z.any().default(0),
  deposit_type: z.string().default("bank_guarantee"),
  notice_period_months: z.any().default(6),
  renewal_option: z.boolean().default(false),
  renewal_years: z.any().default(6),
  break_option: z.boolean().default(false),
  break_years: z.any().default(3),
  break_notice_months: z.any().default(6),
});

export const createIstanzaSchema = z.object({
  lease_id: z.string().uuid(),
  year: z.number().int().min(2000).max(2100),
  base_index_year: z.number().int(),
  base_index_value: z.number().min(0),
  current_index_value: z.number().min(0),
  index_percentage: z.number().min(0).max(100),
  original_rent: z.number().min(0),
  new_rent: z.number().min(0),
  increase_amount: z.number().min(0),
  increase_percentage: z.number().min(0).max(100),
});
