-- =============================================================================
-- LEASEGUARD B2B - Database Schema
-- Run in Supabase SQL Editor: https://app.supabase.com/sql
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- TABLE: companies (Aziende / Conduttori)
-- =============================================================================
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  legal_name TEXT,
  vat_number TEXT UNIQUE NOT NULL,
  pec_email TEXT,
  address TEXT,
  city TEXT,
  province TEXT,
  cap TEXT,
  phone TEXT,
  website TEXT,
  stripe_customer_id TEXT,
  subscription_status TEXT DEFAULT 'trialing' CHECK (subscription_status IN ('trialing', 'active', 'past_due', 'canceled', 'incomplete')),
  subscription_plan TEXT DEFAULT 'starter' CHECK (subscription_plan IN ('starter', 'professional', 'enterprise')),
  max_leases INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABLE: profiles (Utenti / Admin)
-- =============================================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT CHECK (role IN ('owner', 'admin', 'manager', 'viewer')) DEFAULT 'manager',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABLE: leases (Contratti di Locazione)
-- =============================================================================
CREATE TABLE IF NOT EXISTS leases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  property_name TEXT NOT NULL,
  property_address TEXT NOT NULL,
  property_city TEXT,
  property_province TEXT,
  property_cap TEXT,
  property_type TEXT CHECK (property_type IN ('shop', 'restaurant', 'office', 'warehouse', 'franchise', 'other')) DEFAULT 'shop',
  landlord_name TEXT,
  landlord_address TEXT,
  landlord_pec TEXT,
  lease_start_date DATE NOT NULL,
  lease_end_date DATE,
  base_rent_monthly NUMERIC(12,2) NOT NULL DEFAULT 0,
  base_rent_annual NUMERIC(12,2) GENERATED ALWAYS AS (base_rent_monthly * 12) STORED,
  rent_percentage BOOLEAN DEFAULT FALSE,
  percentage_breakpoint NUMERIC(12,2) DEFAULT 0,
  percentage_rate NUMERIC(5,2) DEFAULT 0,
  is_statute_indexed BOOLEAN DEFAULT TRUE,
  index_percentage NUMERIC(5,2) DEFAULT 75,
  base_index_year INTEGER DEFAULT 2024,
  cam_expenses_monthly NUMERIC(12,2) DEFAULT 0,
  deposit_amount NUMERIC(12,2) DEFAULT 0,
  deposit_type TEXT CHECK (deposit_type IN ('bank_guarantee', 'cash', 'insurance')) DEFAULT 'bank_guarantee',
  notice_period_months INTEGER DEFAULT 6,
  renewal_option BOOLEAN DEFAULT FALSE,
  renewal_years INTEGER DEFAULT 6,
  break_option BOOLEAN DEFAULT FALSE,
  break_years INTEGER DEFAULT 3,
  break_notice_months INTEGER DEFAULT 6,
  current_status TEXT CHECK (current_status IN ('active', 'expiring_soon', 'expired', 'terminated', 'renewed', 'cancelled')) DEFAULT 'active',
  next_critical_date TIMESTAMPTZ,
  critical_date_type TEXT,
  document_url TEXT,
  notes TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABLE: lease_istanza (ISTAT Adeguamenti registrati)
-- =============================================================================
CREATE TABLE IF NOT EXISTS lease_istanza (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lease_id UUID REFERENCES leases(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  base_index_year INTEGER NOT NULL,
  base_index_value NUMERIC(6,2) NOT NULL,
  current_index_value NUMERIC(6,2) NOT NULL,
  index_percentage NUMERIC(5,2) NOT NULL DEFAULT 75,
  original_rent NUMERIC(12,2) NOT NULL,
  new_rent NUMERIC(12,2) NOT NULL,
  increase_amount NUMERIC(12,2) NOT NULL,
  increase_percentage NUMERIC(6,2) NOT NULL,
  status TEXT CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'disputed')) DEFAULT 'draft',
  letter_pdf_url TEXT,
  sent_at TIMESTAMPTZ,
  responded_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABLE: critical_dates (Scadenze automatiche)
-- =============================================================================
CREATE TABLE IF NOT EXISTS critical_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lease_id UUID REFERENCES leases(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('disconnection', 'renewal', 'break', 'indexation', 'deposit_return', 'other')),
  label TEXT NOT NULL,
  due_date TIMESTAMPTZ NOT NULL,
  days_before INTEGER DEFAULT 0,
  is_notified BOOLEAN DEFAULT FALSE,
  notified_at TIMESTAMPTZ,
  notification_method TEXT CHECK (notification_method IN ('email', 'sms', 'whatsapp', 'pec', 'push')),
  is_past_due BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABLE: payments (Registrazione Pagamenti Affitti)
-- =============================================================================
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lease_id UUID REFERENCES leases(id) ON DELETE CASCADE,
  period_year INTEGER NOT NULL,
  period_month INTEGER NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  base_rent NUMERIC(12,2) NOT NULL,
  cam_amount NUMERIC(12,2) DEFAULT 0,
  is_statute_increase BOOLEAN DEFAULT FALSE,
  istat_increase_amount NUMERIC(12,2) DEFAULT 0,
  payment_date TIMESTAMPTZ,
  payment_method TEXT,
  transaction_reference TEXT,
  status TEXT CHECK (status IN ('pending', 'paid', 'overdue', 'refunded')) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABLE: audit_log (Log attività)
-- =============================================================================
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  company_id UUID REFERENCES companies(id),
  action TEXT NOT NULL,
  entity_type TEXT CHECK (entity_type IN ('lease', 'critical_date', 'payment', 'company', 'istanza')),
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- ENABLE RLS (Row Level Security)
-- =============================================================================
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leases ENABLE ROW LEVEL SECURITY;
ALTER TABLE lease_istanza ENABLE ROW LEVEL SECURITY;
ALTER TABLE critical_dates ENABLE ROW Level SECURITY;
ALTER TABLE payments ENABLE ROW Level SECURITY;
ALTER TABLE audit_log ENABLE ROW Level SECURITY;

-- =============================================================================
-- POLICIES: Le aziende vedono solo i propri dati
-- =============================================================================
CREATE POLICY "Companies can view own data" ON companies
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can view leases of own company" ON leases
  FOR SELECT USING (
    company_id IN (SELECT company_id FROM profiles WHERE auth_user_id = auth.uid())
  );

CREATE POLICY "Users can insert own leases" ON leases
  FOR INSERT WITH CHECK (
    company_id IN (SELECT company_id FROM profiles WHERE auth_user_id = auth.uid())
  );

CREATE POLICY "Users can update own leases" ON leases
  FOR UPDATE USING (
    company_id IN (SELECT company_id FROM profiles WHERE auth_user_id = auth.uid())
  );

CREATE POLICY "Users can delete own leases" ON leases
  FOR DELETE USING (
    company_id IN (SELECT company_id FROM profiles WHERE auth_user_id = auth.uid())
  );

-- Policy per istanza
CREATE POLICY "Users can view own istantanze" ON lease_istanza
  FOR SELECT USING (
    lease_id IN (SELECT id FROM leases WHERE company_id IN (SELECT company_id FROM profiles WHERE auth_user_id = auth.uid()))
  );

-- Policy per critical dates
CREATE POLICY "Users can view own critical dates" ON critical_dates
  FOR SELECT USING (
    lease_id IN (SELECT id FROM leases WHERE company_id IN (SELECT company_id FROM profiles WHERE auth_user_id = auth.uid()))
  );

-- Policy per payments
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (
    lease_id IN (SELECT id FROM leases WHERE company_id IN (SELECT company_id FROM profiles WHERE auth_user_id = auth.uid()))
  );

-- =============================================================================
-- TRIGGERS: Aggiorna updated_at automaticamente
-- =============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leases_updated_at BEFORE UPDATE ON leases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_istanza_updated_at BEFORE UPDATE ON lease_istanza
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_critical_dates_updated_at BEFORE UPDATE ON critical_dates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- FUNZIONE: Calcolo criticità scadenze
-- =============================================================================
CREATE OR REPLACE FUNCTION calculate_critical_dates()
RETURNS TRIGGER AS $$
DECLARE
  v_due_date TIMESTAMPTZ;
  v_lease_end DATE;
  v_notice_months INTEGER;
BEGIN
  IF TG_TABLE_NAME = 'leases' THEN
    v_lease_end := NEW.lease_end_date;
    v_notice_months := COALESCE(NEW.notice_period_months, 6);

    -- Calcola data disconnessione (scadenza contratto)
    IF v_lease_end IS NOT NULL THEN
      v_due_date := v_lease_end - (v_notice_months || ' months')::interval;

      INSERT INTO critical_dates (lease_id, type, label, due_date, days_before, notification_method)
      VALUES (NEW.id, 'disconnection', 'Disconnessione: invia PEC entro ' || v_notice_months || ' mesi', v_due_date, v_notice_months, 'email')
      ON CONFLICT DO NOTHING;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trg_calculate_critical_dates
  AFTER INSERT OR UPDATE ON leases
  FOR EACH ROW EXECUTE FUNCTION calculate_critical_dates();

-- =============================================================================
-- INDICI PER PERFORMANCE
-- =============================================================================
CREATE INDEX idx_leases_company_id ON leases(company_id);
CREATE INDEX idx_leases_current_status ON leases(current_status);
CREATE INDEX idx_leases_next_critical_date ON leases(next_critical_date) WHERE next_critical_date IS NOT NULL;
CREATE INDEX idx_critical_dates_due_date ON critical_dates(due_date) WHERE is_notified = false;
CREATE INDEX idx_critical_dates_past_due ON critical_dates(due_date) WHERE is_past_due = true;
CREATE INDEX idx_payments_lease_id ON payments(lease_id);
CREATE INDEX idx_audit_log_company_id ON audit_log(company_id);
CREATE INDEX idx_lease_istanza_lease_id ON lease_istanza(lease_id);
