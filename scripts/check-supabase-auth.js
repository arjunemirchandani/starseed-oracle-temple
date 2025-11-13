#!/usr/bin/env node

/**
 * Script to check and display Supabase Auth configuration
 * This helps diagnose OAuth redirect URL issues
 */

const https = require('https');

// Supabase project details
const PROJECT_REF = 'lxzaerwvbkkgbgvyhltq';
const SUPABASE_URL = `https://${PROJECT_REF}.supabase.co`;

// Your Supabase access token (needed for management API)
const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN || 'sbp_7d3bae6925780fc23f4f0e0589aeb0d7add960ef';

async function makeRequest(path, method = 'GET', body = null) {
  const options = {
    hostname: 'api.supabase.com',
    port: 443,
    path: path,
    method: method,
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });

    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function checkAuthConfig() {
  console.log('🔍 Checking Supabase Auth Configuration...\n');
  console.log(`Project: ${PROJECT_REF}`);
  console.log(`URL: ${SUPABASE_URL}\n`);

  try {
    // Get project config
    const projectConfig = await makeRequest(`/v1/projects/${PROJECT_REF}/config/auth`);

    console.log('📋 Current Auth Configuration:');
    console.log('================================\n');

    // Site URL
    if (projectConfig.site_url) {
      console.log(`Site URL: ${projectConfig.site_url}`);
    }

    // Redirect URLs
    if (projectConfig.redirect_urls) {
      console.log('\nRedirect URLs:');
      projectConfig.redirect_urls.forEach(url => {
        console.log(`  - ${url}`);
        if (url.includes('thestarseedoracle.comthestarseedoracle.com')) {
          console.log('    ⚠️  WARNING: This URL has doubled domain!');
        }
      });
    }

    // OAuth providers
    if (projectConfig.external_providers) {
      console.log('\nOAuth Providers:');
      Object.keys(projectConfig.external_providers).forEach(provider => {
        const config = projectConfig.external_providers[provider];
        if (config.enabled) {
          console.log(`  ✅ ${provider}: enabled`);
          if (config.redirect_uri) {
            console.log(`     Redirect URI: ${config.redirect_uri}`);
          }
        }
      });
    }

    console.log('\n🔧 Suggested Redirect URLs for Starseed Oracle Temple:');
    console.log('  - https://thestarseedoracle.com/auth/callback');
    console.log('  - https://www.thestarseedoracle.com/auth/callback');
    console.log('  - https://starseedoracle.app/auth/callback');
    console.log('  - https://www.starseedoracle.app/auth/callback');
    console.log('  - https://starseed-oracle-temple.fly.dev/auth/callback');
    console.log('  - http://localhost:3000/auth/callback');
    console.log('  - http://localhost:3001/auth/callback');

    console.log('\n📝 To fix the redirect URL issue:');
    console.log('1. Go to: https://supabase.com/dashboard/project/lxzaerwvbkkgbgvyhltq/auth/url-configuration');
    console.log('2. Remove any URLs with doubled domains (thestarseedoracle.comthestarseedoracle.com)');
    console.log('3. Add the correct URLs listed above');
    console.log('4. Save the configuration');

  } catch (error) {
    console.error('❌ Error fetching auth config:', error.message);
    console.log('\n💡 You may need to manually check the configuration at:');
    console.log('https://supabase.com/dashboard/project/lxzaerwvbkkgbgvyhltq/auth/url-configuration');
  }
}

checkAuthConfig();