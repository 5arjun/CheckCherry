import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zvtbpjpybeeihyezltam.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2dGJwanB5YmVlaWh5ZXpsdGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MzY5NzYsImV4cCI6MjA2OTMxMjk3Nn0.l8zNqe3HRuJgwOHEW3bSqrtggP2PjfPljV2S5G0_jG4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
