# SlipIQ

Pre-bet sports intelligence — know how attractive a wager is before you place it.

## Current story: User Sign-Up

Email/password registration via Supabase Auth with client-side validation and redirect to welcome dashboard.

### Setup

1. Create a free [Supabase](https://supabase.com) project.
2. Copy `.env.example` → `apps/mobile/.env` and add your URL + anon key.
3. In Supabase **Authentication → Providers → Email**, enable email sign-up.
   - For fastest dev testing, disable **Confirm email** under email auth settings.
4. Run the app:

```bash
cd apps/mobile
npm install
npm start
```

Scan the QR code with **Expo Go** on your phone.

### Validation rules

- Valid email format
- Password: min 8 characters, letters, numbers, and a symbol
- Confirm password must match
- Errors shown for incomplete forms and already-registered emails

### Tests

```bash
cd apps/mobile
npm test
npm run typecheck
```
