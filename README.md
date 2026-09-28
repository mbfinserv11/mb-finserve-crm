# MB FinServe CRM

Mobile-friendly finance CRM starter for Vercel + Supabase.

## Run locally
1. Install Node.js.
2. Run `npm install`
3. Run `npm run dev`

## Supabase
1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy Project URL and anon key into `.env.local` using `.env.example`.

## Deploy
Push this folder to GitHub and import the repository in Vercel.
Add the same `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables.

## Integrations
The UI includes architecture placeholders for:
- WhatsApp Business Platform / Cloud API
- Facebook Lead Ads
- Google Drive

Live Meta integrations require Meta app credentials, webhook endpoints and the applicable WhatsApp/Facebook permissions. Secrets must stay server-side.
