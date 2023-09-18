import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://whztrazdmfdndpyhsevu.supabase.co'
const supabaseKey = `process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoenRyYXpkbWZkbmRweWhzZXZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ2OTIzOTEsImV4cCI6MjAxMDI2ODM5MX0.bv92yO7YI8MUId21CAeC-Z64bybS5ofhSpX2ZjqXRPk`
export const supabase = createClient(supabaseUrl, supabaseKey)
