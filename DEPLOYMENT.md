# Deployment Guide: DashGen (Free Tier Stack)

This guide covers deploying the entire Dynamic Generative UI SaaS Dashboard Engine using free-tier services.

## 1. Upstash Redis (Caching & Rate Limiting)
1. Go to [Upstash](https://upstash.com/) and create a free account.
2. Click **Create Database** (Name: `dashgen`, Type: `Redis`, Region: select closest to you).
3. Once created, scroll down to the **REST API** section.
4. Copy the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` values.
5. Save these for your `.env` later.

## 2. Supabase (Database & Auth Sync)
1. Go to [Supabase](https://supabase.com/) and create a new project on the free tier.
2. Go to the **SQL Editor** in the left sidebar.
3. Open a new query, paste the contents of `supabase/migrations/001_initial_schema.sql` from your code, and run it. This creates the `dashboards` table and RLS policies.
4. Go to **Project Settings** -> **API**.
5. Copy the **Project URL** (`NEXT_PUBLIC_SUPABASE_URL`), **anon public key** (`NEXT_PUBLIC_SUPABASE_ANON_KEY`), and **service_role secret** (`SUPABASE_SERVICE_ROLE_KEY`). Keep the service role key completely secret!

## 3. Clerk (Authentication)
1. Go to [Clerk](https://clerk.com/) and create a new application.
2. Choose **Email** and **Google** (or any social providers) as sign-in options.
3. Go to **API Keys** in the Clerk dashboard.
4. Copy the **Publishable Key** (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`) and **Secret Key** (`CLERK_SECRET_KEY`).
5. Next, we need to connect Clerk to Supabase. Go to **Integrations** in the Clerk dashboard.
6. Enable the **Supabase** integration. It will auto-generate a JWT template named `supabase`.

## 4. Google Gemini API (AI Provider)
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Click **Create API Key**.
3. Copy the API key. This will be your `GOOGLE_GENERATIVE_AI_API_KEY`. (The `gemini-2.0-flash` model gives you 1,500 requests per day for free).

## 5. Vercel Deployment
1. Push your repository to GitHub (which you should have done!).
2. Go to [Vercel](https://vercel.com/) and log in with GitHub.
3. Click **Add New...** -> **Project**.
4. Import your `dashboard-engine` repository.
5. In the **Environment Variables** section, add all of the keys you collected above:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GOOGLE_GENERATIVE_AI_API_KEY`
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
6. Click **Deploy**.

## Testing Production
Once Vercel finishes building, click on your project URL. You should be able to:
1. Sign up/Log in via Clerk.
2. Generate a new dashboard (hits Gemini API + rate limited by Upstash).
3. Save the dashboard (saves to Supabase).
4. Reload the page to see it persist securely (via RLS).

Congratulations! Your AI Dashboard Engine is live on a completely free, highly-scalable architecture!
