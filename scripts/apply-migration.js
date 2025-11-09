// Script to apply the user_profiles migration to Supabase
// Run this with: node scripts/apply-migration.js

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get Supabase credentials from environment
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lxzaerwvbkkgbgvyhltq.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required');
  console.log('Please set it in your .env.local file or environment');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function applyMigration() {
  try {
    console.log('🚀 Starting migration...');

    // Read the migration file
    const migrationPath = path.join(__dirname, '../supabase/migrations/001_extend_user_profiles.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    console.log('📄 Loaded migration file');

    // Note: Supabase JS client doesn't support raw SQL execution directly
    // We need to use the Management API or apply via Supabase Dashboard

    console.log('\n⚠️  Important: Supabase JS client cannot execute raw SQL migrations directly.');
    console.log('\n📋 To apply this migration, please choose one of these options:\n');
    console.log('Option 1: Supabase Dashboard (Recommended)');
    console.log('1. Go to: https://app.supabase.com/project/lxzaerwvbkkgbgvyhltq/sql/new');
    console.log('2. Copy and paste the migration SQL from:');
    console.log('   /supabase/migrations/001_extend_user_profiles.sql');
    console.log('3. Click "Run" to execute the migration\n');

    console.log('Option 2: Using Supabase CLI');
    console.log('1. Install Supabase CLI: brew install supabase/tap/supabase');
    console.log('2. Link the project: supabase link --project-ref lxzaerwvbkkgbgvyhltq');
    console.log('3. Apply migration: supabase db push\n');

    console.log('Option 3: Manual Test (Check if already applied)');
    console.log('Testing if migration is already applied...\n');

    // Test if the new columns exist
    const { data, error } = await supabase
      .from('user_profiles')
      .select('id, display_name, bio, avatar_url, starseed_origin')
      .limit(1);

    if (error) {
      if (error.message.includes('bio') || error.message.includes('avatar_url')) {
        console.log('❌ Migration not yet applied - new columns do not exist');
        console.log('Please apply the migration using one of the options above');
      } else {
        console.error('❌ Error checking migration status:', error.message);
      }
    } else {
      console.log('✅ Migration appears to be already applied!');
      console.log('The new columns (bio, avatar_url, starseed_origin) are accessible');

      if (data && data.length > 0) {
        console.log('\nSample profile data:');
        console.log('- ID:', data[0].id);
        console.log('- Display Name:', data[0].display_name);
        console.log('- Bio:', data[0].bio || '(not set)');
        console.log('- Avatar URL:', data[0].avatar_url || '(not set)');
        console.log('- Starseed Origin:', data[0].starseed_origin || '(not set)');
      }
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the migration check
applyMigration();