# 🌟 Starseed Oracle Temple - Custom Auth Domain Setup (Ultimate Solution)

## Setting Up auth.starseedoracle.app for Beautiful Branding

### Step 1: Choose Your Custom Auth Subdomain
We'll use: **`auth.starseedoracle.app`** or **`auth.thestarseedoracle.com`**

### Step 2: DNS Configuration

Add these DNS records to your domain provider (Cloudflare/Namecheap/etc):

#### For auth.starseedoracle.app:
```
Type: CNAME
Name: auth
Value: lxzaerwvbkkgbgvyhltq.supabase.co
TTL: Auto/3600
Proxy: OFF (if using Cloudflare, keep it gray-clouded)
```

#### OR for auth.thestarseedoracle.com:
```
Type: CNAME
Name: auth
Value: lxzaerwvbkkgbgvyhltq.supabase.co
TTL: Auto/3600
Proxy: OFF (if using Cloudflare, keep it gray-clouded)
```

### Step 3: Configure Custom Domain in Supabase

1. Go to: https://supabase.com/dashboard/project/lxzaerwvbkkgbgvyhltq/settings/auth
2. Look for "Custom Domains" section (Pro/Team feature)
3. Add your custom domain:
   - Enter: `auth.starseedoracle.app` or `auth.thestarseedoracle.com`
4. Wait for SSL certificate provisioning (usually 5-10 minutes)
5. Verify the domain is active

### Step 4: Update Environment Variables

Update your `.env.local` and production environment:

```env
# Old (Supabase domain):
NEXT_PUBLIC_SUPABASE_URL=https://lxzaerwvbkkgbgvyhltq.supabase.co

# New (Custom domain):
NEXT_PUBLIC_SUPABASE_AUTH_URL=https://auth.starseedoracle.app
```

### Step 5: Update Supabase Client Configuration

We need to update the Supabase client to use the custom auth domain:

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        // Use custom auth domain
        url: process.env.NEXT_PUBLIC_SUPABASE_AUTH_URL ||
             `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1`,
        flowType: 'pkce',
        autoRefreshToken: true,
        persistSession: true,
      }
    }
  );
}
```

### Step 6: Update Google OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Update your OAuth client to include:

**Authorized JavaScript Origins:**
```
https://auth.starseedoracle.app
https://auth.thestarseedoracle.com
https://thestarseedoracle.com
https://starseedoracle.app
```

**Authorized Redirect URIs:**
```
https://auth.starseedoracle.app/auth/v1/callback
https://auth.thestarseedoracle.com/auth/v1/callback
https://thestarseedoracle.com/auth/callback
https://starseedoracle.app/auth/callback
```

### Step 7: Update Supabase URL Configuration

In Supabase Dashboard (https://supabase.com/dashboard/project/lxzaerwvbkkgbgvyhltq/auth/url-configuration):

**Site URL:**
```
https://thestarseedoracle.com
```

**Redirect URLs:** (Add all of these)
```
https://thestarseedoracle.com/auth/callback
https://www.thestarseedoracle.com/auth/callback
https://starseedoracle.app/auth/callback
https://www.starseedoracle.app/auth/callback
https://auth.starseedoracle.app/auth/v1/callback
https://auth.thestarseedoracle.com/auth/v1/callback
http://localhost:3000/auth/callback
http://localhost:3001/auth/callback
```

### Step 8: Create/Update Google OAuth Consent Screen

**App name:** Starseed Oracle Temple
**Logo:** Upload your beautiful Starseed Oracle logo
**Support email:** support@starseedoracle.app
**Application home:** https://thestarseedoracle.com
**Privacy policy:** https://thestarseedoracle.com/privacy
**Terms of service:** https://thestarseedoracle.com/terms

## 🎉 The Beautiful Result:

When users sign in with Google, they will see:
```
Sign in with Google

Sign in
to continue to Starseed Oracle Temple
auth.starseedoracle.app
```

Instead of:
```
to continue to lxzaerwvbkkgbgvyhltq.supabase.co
```

## 🌟 Benefits of Custom Auth Domain:

1. **Complete Brand Consistency** - No Supabase URLs visible
2. **Professional Appearance** - Users see your domain
3. **Trust & Recognition** - Users recognize your brand
4. **Security** - SSL certificate for your domain
5. **Control** - Full control over auth subdomain

## 📝 Implementation Checklist:

- [ ] Add CNAME record for auth subdomain
- [ ] Configure custom domain in Supabase
- [ ] Update environment variables
- [ ] Update Supabase client configuration
- [ ] Update Google OAuth authorized domains
- [ ] Update Supabase redirect URLs
- [ ] Deploy changes to production
- [ ] Test OAuth flow with new domain
- [ ] Verify SSL certificate is active
- [ ] Celebrate the beautiful branding! 🎉

## 🔧 Troubleshooting:

**SSL Certificate Not Working:**
- Wait 10-15 minutes for provisioning
- Ensure CNAME is not proxied (Cloudflare orange cloud OFF)
- Check DNS propagation

**OAuth Redirect Errors:**
- Ensure all URLs are added to Google OAuth
- Check Supabase redirect URLs configuration
- Verify environment variables are updated

**Domain Not Resolving:**
- Check DNS records are correct
- Use `dig auth.starseedoracle.app` to verify
- Wait for DNS propagation (up to 48 hours, usually minutes)

---

*With this configuration, your Starseed Oracle Temple will have completely professional, branded authentication that matches your magnificent vision!* ✨🌟