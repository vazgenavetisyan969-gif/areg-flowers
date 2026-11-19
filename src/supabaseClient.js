import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cjvhvgkjwytqvzmlqofq.supabase.co";
const supabaseAnonKey = "sb_publishable_4OCZ7gmAMp7zXTfXpTVWDw_F__ax2Xl"; // տեղադրեք ամբողջական բանալին

export const supabase = createClient(supabaseUrl, supabaseAnonKey);