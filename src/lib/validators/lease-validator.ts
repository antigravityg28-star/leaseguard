// =============================================================================
// LEASEGUARD B2B - Zod Validators
// =============================================================================
import { z } from "zod";

export const createLeaseSchema = z.object({
  code: z.string().min(3).max(20),
  property_name: z.string().min(2).max(200),
  property_address: z.string().min(5).max(500),
  property_city: z.string().min(2).max(200),
  property_province: z.string().length(2).max(2),
  property_cap: z.string().length(5).regex(/^\d{5}$/, "CAP deve essere di 5 cifre"),
  property_type: z.enum(["shop", "restaurant", "office", "warehouse", "franchise", "other"]),
  landlord_name: z.string().min(2).max(200),
  landlord_address: z.string().min(5).max(500),
  landlord_pec: z.string().email().optional().or(z.literal("")),
  lease_start_date: z.string().min(1),
  lease_end_date: z.string().min(1).optional(),
  base_rent_monthly: z.number().min(0).max(1000000),
  rent_percentage: z.boolean().default(false),
  percentage_breakpoint: z.number().min(0).default(0),
  percentage_rate: z.number().min(0).max(100).default(0),
  is_statute_indexed: z.boolean().default(true),
  index_percentage: z.number().min(0).max(100).default(75),
  base_index_year: z.number().default(2024),
  cam_expenses_monthly: z.number().min(0).default(0),
  deposit_amount: z.number().min(0).default(0),
  deposit_type: z.enum(["bank_guarantee", "cash", "insurance"]).default("bank_guarantee"),
  notice_period_months: z.number().min(1).max(24).default(6),
  renewal_option: z.boolean().default(false),
  renewal_years: z.number().min(1).max(20).default(6),
  break_option: z.boolean().default(false),
  break_years: z.number().min(1).max(20).default(3),
  break_notice_months: z.number().min(1).max(24).default(6),
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
