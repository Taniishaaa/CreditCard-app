import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wkoaoincligfkqzpwinb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indrb2FvaW5jbGlnZmtxenB3aW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3OTQzMDcsImV4cCI6MjA2OTM3MDMwN30.D9CeSoTiI6nlCtMCQVBP7Rg9axhoA2PgKfS2x4d5pJs'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
