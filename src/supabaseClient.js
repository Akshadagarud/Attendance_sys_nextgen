// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kidbzlespbhlseivcosi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpZGJ6bGVzcGJobHNlaXZjb3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk4MzQzMjksImV4cCI6MjAzNTQxMDMyOX0.9GraLP8enw7jJhgUyD8A0_bL8sSGRF5h-5tByvo5ceY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
