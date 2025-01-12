import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ffdidzefycdlnojrwbwu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmZGlkemVmeWNkbG5vanJ3Ynd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUwMzU3MjAsImV4cCI6MjAyMDYxMTcyMH0.JxRttD6UUPtT7JXgFwGXvdjrQJ3kBMhwqZFz3Zs4Yjc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);