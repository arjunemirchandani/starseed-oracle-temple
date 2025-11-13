# 🌟 Starseed Oracle Temple - Supabase Email Templates 🌟

Copy and paste these templates into your Supabase Dashboard Email Templates section.

---

## 1. CONFIRM SIGN UP

**Subject:**
```
🔮 Welcome to Starseed Oracle Temple - Confirm Your Journey ✨
```

**Body:**
```html
<h2>✨ Welcome, Beloved Starseed! ✨</h2>

<p>You have been called to the Starseed Oracle Temple by the frequencies of awakening.</p>

<p>Your soul recognition has activated a portal to infinite wisdom. Click below to confirm your sacred journey:</p>

<p><a href="{{ .ConfirmationURL }}">🌟 Activate Your Portal 🌟</a></p>

<p style="color: #888; font-size: 12px;">This sacred link expires in 24 hours. If you didn't request this, simply ignore this message.</p>

<p>With infinite love and cosmic blessings,<br>
The Starseed Oracle Temple<br>
<a href="https://thestarseedoracle.com">thestarseedoracle.com</a></p>
```

---

## 2. INVITE USER

**Subject:**
```
🌟 You're Invited to the Starseed Oracle Temple 🌟
```

**Body:**
```html
<h2>🌙 Sacred Invitation to the Temple 🌙</h2>

<p>A fellow starseed has recognized your divine spark and invited you to join the Starseed Oracle Temple, where 144,000 souls are gathering for planetary ascension.</p>

<p><a href="{{ .ConfirmationURL }}">✨ Accept Sacred Invitation ✨</a></p>

<p>The Oracle awaits your presence 🔮</p>

<p>With cosmic love,<br>
The Starseed Oracle Temple</p>
```

---

## 3. MAGIC LINK

**Subject:**
```
🔮 Your Magic Portal to Starseed Oracle Temple ✨
```

**Body:**
```html
<h2>✨ Your Magic Link Has Manifested! ✨</h2>

<p>The cosmic energies have aligned to create your personal portal. Click below to instantly enter the temple:</p>

<p><a href="{{ .ConfirmationURL }}">🌟 Enter Through Magic Portal 🌟</a></p>

<p style="color: #888; font-size: 12px;">This magic link expires in 1 hour. Request a new one if needed.</p>

<p>May your journey be blessed,<br>
The Starseed Oracle Temple</p>
```

---

## 4. CHANGE EMAIL ADDRESS

**Subject:**
```
📧 Confirm Your New Email - Starseed Oracle Temple
```

**Body:**
```html
<h2>🌙 Update Your Sacred Connection 🌙</h2>

<p>You've requested to update your email address in the Akashic Records of the Starseed Oracle Temple.</p>

<p>Please confirm this change to maintain your connection:</p>

<p><a href="{{ .ConfirmationURL }}">✨ Confirm New Address ✨</a></p>

<p>With infinite blessings,<br>
The Starseed Oracle Temple</p>
```

---

## 5. RESET PASSWORD

**Subject:**
```
🔐 Reset Your Password - Starseed Oracle Temple
```

**Body:**
```html
<h2>🗝️ Create a New Sacred Password 🗝️</h2>

<p>The cosmic winds have carried your request to reset your temple access.</p>

<p>Click below to create a new sacred password:</p>

<p><a href="{{ .ConfirmationURL }}">🌟 Reset Password 🌟</a></p>

<p style="color: #888; font-size: 12px;">This link expires in 1 hour. If you didn't request this, your account remains secure.</p>

<p>Protected by cosmic encryption,<br>
The Starseed Oracle Temple</p>
```

---

## 6. REAUTHENTICATION

**Subject:**
```
🔄 Verify Your Identity - Starseed Oracle Temple
```

**Body:**
```html
<h2>✨ Verify Your Cosmic Signature ✨</h2>

<p>For your protection, we need to verify your identity before making sacred changes to your temple access.</p>

<p><a href="{{ .ConfirmationURL }}">🔮 Verify Identity 🔮</a></p>

<p>Protected by the light,<br>
The Starseed Oracle Temple</p>
```

---

## 📝 How to Apply These Templates:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/lxzaerwvbkkgbgvyhltq/auth/templates
2. Click on each email type tab
3. Replace the default Subject and Body with the templates above
4. Click "Save" for each template

## 🎨 Customization Notes:

- The `{{ .ConfirmationURL }}` variable is automatically replaced by Supabase
- Keep HTML simple as Supabase email templates have limited CSS support
- Emojis add visual appeal and work in most email clients
- Test each template by triggering the respective auth flow

## ✨ Brand Consistency:

All templates maintain:
- 🔮 Mystical, cosmic language
- ✨ Star and crystal emojis
- 🌟 Warm, welcoming tone
- 💜 Reference to the 144,000 souls gathering
- 🏛️ "Temple" terminology throughout
- 📿 Spiritual/sacred framing of technical processes