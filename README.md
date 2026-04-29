# DashGen: Dynamic Generative UI Dashboard Engine

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Groq](https://img.shields.io/badge/Groq-Llama_3.3-f55036?style=flat-square)](https://groq.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=flat-square&logo=clerk)](https://clerk.dev/)

DashGen is a SaaS platform that allows users to instantly generate beautiful, interactive analytics dashboards using natural language. Built for speed and flexibility, it uses Groq's lightning-fast Llama 3.3 model to parse natural language requirements and instantly stream structured dashboard components to the client.

## ✨ Features

- **Generative UI:** Type what you want (e.g., "E-commerce dashboard with MRR and churn rate") and watch a fully interactive React dashboard assemble itself.
- **Ultra-Low Latency:** Powered by Groq's LPU inference engine, hitting 800+ tokens per second.
- **Robust Error Handling:** Bypasses rigid SDK schema limitations with raw text-to-JSON parsing and highly permissive Zod validation. LLM hallucinations are caught and handled gracefully without crashing the React tree.
- **Persistent Storage:** Instantly save generated layouts to Supabase using Clerk's secure JWT integration.
- **Edge Ready:** Built on Next.js App Router and deployed on Vercel's Edge Runtime for maximum performance.
- **Rate Limiting:** Integrated Upstash Redis to prevent API abuse.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS, Recharts, Framer Motion
- **AI Backend:** Groq (`llama-3.3-70b-versatile`)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Clerk
- **Caching/Rate Limiting:** Upstash Redis

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/pushkarparakh/dashboard-engine.git
cd dashboard-engine
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory and add the following keys:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...

# AI & Caching
GROQ_API_KEY=gsk_...
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

### 3. Database Setup (Supabase)
Navigate to your Supabase project's SQL Editor and run the following script to create the dashboards table and configure Row Level Security (RLS):

```sql
-- Create dashboards table
CREATE TABLE public.dashboards (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text NOT NULL,
  name text NOT NULL,
  description text,
  layout jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.dashboards ENABLE ROW LEVEL SECURITY;

-- Create policies for Clerk authentication
CREATE POLICY "Users can view own dashboards" 
  ON public.dashboards FOR SELECT 
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create own dashboards" 
  ON public.dashboards FOR INSERT 
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own dashboards" 
  ON public.dashboards FOR UPDATE 
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own dashboards" 
  ON public.dashboards FOR DELETE 
  USING (auth.uid()::text = user_id);

-- Force API Schema Reload
NOTIFY pgrst, 'reload schema';
```

### 4. Clerk JWT Integration
To allow Clerk to communicate securely with Supabase:
1. Go to the **Clerk Dashboard** > **Configure** > **JWT Templates**.
2. Create a new template and select **Supabase**.
3. Name the template `supabase`.
4. Paste your **Supabase JWT Secret** (found in Supabase Settings > API) into the Signing Key field and save.

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the application running.

---

## 🧠 Architecture Notes: The AI Bypass Strategy

During development, we encountered strict JSON Schema limitations with newer LLM models (like Llama 3.3) rejecting standard Vercel AI SDK forced structures. 

**Our Solution:** 
Instead of relying on the SDK's `generateObject`, we utilize `generateText` and built a robust custom pipeline:
1. **Regex Extraction:** Safely extracts raw JSON blocks out of conversational LLM text.
2. **Permissive Zod Validation:** Uses a highly relaxed schema to validate the UI structure. If the model hallucinates slightly (e.g., wrong enum casing, missing optional labels), the schema absorbs the error and applies safe defaults instead of crashing the React component tree.
3. **Graceful Degradation:** If the model completely fails, a clean 500 JSON error is sent to the client and displayed in a toast/banner, maintaining absolute UI stability.

---

## 📄 License
This project is licensed under the MIT License.
