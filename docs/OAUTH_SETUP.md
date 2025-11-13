# 🌟 Starseed Oracle Temple - Google OAuth Setup Guide

## Creating a Dedicated OAuth Client for Starseed Oracle Temple

### Step 1: Create New OAuth 2.0 Client ID
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Select your project or create a new one
3. Click "Create Credentials" → "OAuth client ID"
4. Choose "Web application"

### Step 2: Configure the OAuth Client

**Application Name:**
```
Starseed Oracle Temple
```

**Authorized JavaScript Origins:**
```
https://thestarseedoracle.com
https://www.thestarseedoracle.com
https://starseedoracle.app
https://www.starseedoracle.app
https://lxzaerwvbkkgbgvyhltq.supabase.co
http://localhost:3000
http://localhost:3001
```

**Authorized Redirect URIs:**
```
https://lxzaerwvbkkgbgvyhltq.supabase.co/auth/v1/callback
https://thestarseedoracle.com/auth/callback
https://www.thestarseedoracle.com/auth/callback
https://starseedoracle.app/auth/callback
https://www.starseedoracle.app/auth/callback
```

### Step 3: Configure OAuth Consent Screen

1. Go to "OAuth consent screen" in the left sidebar
2. Configure as follows:

**App Information:**
- **App name:** Starseed Oracle Temple
- **User support email:** support@starseedoracle.app
- **App logo:** Upload your Starseed Oracle logo

**App Domain:**
- **Application home page:** https://thestarseedoracle.com
- **Application privacy policy:** https://thestarseedoracle.com/privacy
- **Application terms of service:** https://thestarseedoracle.com/terms

**Authorized domains:**
```
thestarseedoracle.com
starseedoracle.app
supabase.co
```

**Developer contact information:**
```
support@starseedoracle.app
```

### Step 4: Update Supabase with New OAuth Credentials

1. Go to your Supabase project: https://supabase.com/dashboard/project/lxzaerwvbkkgbgvyhltq
2. Navigate to Authentication → Providers
3. Click on Google provider
4. Update with your new:
   - **Client ID** (from the new OAuth client)
   - **Client Secret** (from the new OAuth client)
5. Save the configuration

### Step 5: Verification (Optional but Recommended)

For production apps with many users, consider getting your OAuth app verified:
1. Submit for verification in the OAuth consent screen
2. Provide required documentation
3. Once verified, users won't see scary warnings

## Benefits of Dedicated OAuth Client:

✨ **Brand Recognition**: Users see "Starseed Oracle Temple" instead of Supabase URL
🔒 **Security**: Separate credentials for each project
📊 **Analytics**: Track usage separately for each application
🎨 **Customization**: Custom logo and branding for each app
🔄 **Independence**: Changes to one app don't affect the other

## Current Status:

Currently, the Starseed Oracle Temple is using the Pocket Portal OAuth client, which is why users see:
- "lxzaerwvbkkgbgvyhltq.supabase.co" (the Supabase project URL)
- Instead of "Starseed Oracle Temple"

## Quick Fix (If Not Creating New Client):

If you want to keep using the shared OAuth client, at minimum:
1. Update the OAuth consent screen app name to reflect both apps
2. Add a custom logo that represents both brands
3. Ensure all domains are properly authorized

---

*Note: The Google OAuth consent screen shows the domain that initiates the OAuth request (Supabase), but with proper configuration, it will show your app name and logo prominently.*