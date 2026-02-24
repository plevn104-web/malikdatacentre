-- Performance indexes for frequently queried columns

-- tool_usage: most queried table (monthly usage counts, analytics)
CREATE INDEX IF NOT EXISTS idx_tool_usage_user_month ON public.tool_usage (user_id, month_year);
CREATE INDEX IF NOT EXISTS idx_tool_usage_month_year ON public.tool_usage (month_year);
CREATE INDEX IF NOT EXISTS idx_tool_usage_tool_name ON public.tool_usage (tool_name);

-- profiles: admin user lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles (email);

-- user_subscriptions: active plan lookups
CREATE INDEX IF NOT EXISTS idx_user_subs_user_status ON public.user_subscriptions (user_id, status);
CREATE INDEX IF NOT EXISTS idx_user_subs_status_expires ON public.user_subscriptions (status, expires_at);

-- transactions: revenue queries
CREATE INDEX IF NOT EXISTS idx_transactions_status_type ON public.transactions (status, type);
CREATE INDEX IF NOT EXISTS idx_transactions_user ON public.transactions (user_id);

-- user_roles: admin role checks
CREATE INDEX IF NOT EXISTS idx_user_roles_user_role ON public.user_roles (user_id, role);
