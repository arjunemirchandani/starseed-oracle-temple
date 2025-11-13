#!/usr/bin/env node

/**
 * Script to fix the Supabase Site URL configuration
 * This resolves the doubled domain issue in OAuth redirects
 */

const https = require('https');

// Supabase project details
const PROJECT_REF = 'lxzaerwvbkkgbgvyhltq';
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
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
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

async function fixSiteUrl() {
  console.log('🔧 Fixing Supabase Site URL Configuration...\n');
  console.log(`Project: ${PROJECT_REF}\n`);

  try {
    // First, get current config
    console.log('📋 Getting current configuration...');
    const currentConfig = await makeRequest(`/v1/projects/${PROJECT_REF}/config/auth`);

    console.log(`Current Site URL: ${currentConfig.data.site_url}`);

    if (currentConfig.data.site_url && currentConfig.data.site_url.includes('thestarseedoracle.comthestarseedoracle.com')) {
      console.log('⚠️  Doubled domain detected! Fixing...\n');

      // Update the site URL
      const updatePayload = {
        site_url: 'https://thestarseedoracle.com',
        redirect_urls: [
          'https://thestarseedoracle.com/auth/callback',
          'https://www.thestarseedoracle.com/auth/callback',
          'https://starseedoracle.app/auth/callback',
          'https://www.starseedoracle.app/auth/callback',
          'https://starseed-oracle-temple.fly.dev/auth/callback',
          'http://localhost:3000/auth/callback',
          'http://localhost:3001/auth/callback',
          'http://localhost:3000/**',
          'http://localhost:3001/**',
          'https://thestarseedoracle.com/**',
          'https://starseedoracle.app/**'
        ]
      };

      console.log('📤 Updating Site URL to: https://thestarseedoracle.com');
      console.log('📤 Adding correct redirect URLs...\n');

      const updateResult = await makeRequest(
        `/v1/projects/${PROJECT_REF}/config/auth`,
        'PATCH',
        updatePayload
      );

      if (updateResult.status === 200 || updateResult.status === 204) {
        console.log('✅ Site URL successfully updated!');
        console.log('✅ Redirect URLs successfully configured!');

        // Verify the update
        console.log('\n🔍 Verifying update...');
        const verifyConfig = await makeRequest(`/v1/projects/${PROJECT_REF}/config/auth`);
        console.log(`New Site URL: ${verifyConfig.data.site_url}`);

        if (verifyConfig.data.redirect_urls) {
          console.log('\nConfigured Redirect URLs:');
          verifyConfig.data.redirect_urls.forEach(url => {
            console.log(`  ✅ ${url}`);
          });
        }

        console.log('\n🎉 OAuth redirect issue should now be resolved!');
        console.log('🔄 Please test the Google Sign-In again.');
      } else {
        console.error('❌ Failed to update configuration:', updateResult.data);
        console.log('\n💡 You may need to manually update the configuration at:');
        console.log('https://supabase.com/dashboard/project/lxzaerwvbkkgbgvyhltq/auth/url-configuration');
      }
    } else {
      console.log('✅ Site URL is already correct!');
      console.log('\n🔍 Current configuration looks good.');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Manual Fix Instructions:');
    console.log('1. Go to: https://supabase.com/dashboard/project/lxzaerwvbkkgbgvyhltq/auth/url-configuration');
    console.log('2. Change Site URL from: https://thestarseedoracle.comthestarseedoracle.com/');
    console.log('3. Change Site URL to: https://thestarseedoracle.com');
    console.log('4. Add the redirect URLs listed above');
    console.log('5. Save the configuration');
  }
}

fixSiteUrl();