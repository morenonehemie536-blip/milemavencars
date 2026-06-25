import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lzzaztsfdsytcqyoncaq.supabase.co'
const supabaseAnonKey = 'sb_publishable_kqebHX2@BKyp8j1hD4E5jw_qn07f5QZ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
