# DashGen

DashGen is an interactive platform that lets users generate complex analytics dashboards using natural language. Under the hood, it uses Groq's Llama 3.3 model for low-latency inference, instantly parsing prompts and streaming structured dashboard components to the client.

## Core Architecture

The application is built on Next.js 16 (App Router) and deployed via Vercel's Edge Runtime. Data persistence is handled by Supabase, and user authentication is managed by Clerk. Upstash Redis is implemented for rate limiting.



## Local Development

### Prerequisites

You will need accounts on:
- Vercel/Next.js
- Supabase (Database)
- Clerk (Auth)
- Groq (LLM Inference)
- Upstash (Redis)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/pushkarparakh/dashboard-engine.git
cd dashboard-engine
npm install
```

### Environment Setup

Create a `.env.local` file at the root of the project with the following variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

GROQ_API_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

### Database Configuration

Navigate to your Supabase SQL Editor and execute the following to set up the dashboards table and RLS policies:

```sql
CREATE TABLE public.dashboards (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text NOT NULL,
  name text NOT NULL,
  description text,
  layout jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.dashboards ENABLE ROW LEVEL SECURITY;

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

NOTIFY pgrst, 'reload schema';
```

### Clerk Integration

To enable Clerk to communicate securely with Supabase:
1. Open the Clerk Dashboard and navigate to Configure > JWT Templates.
2. Create a new template and select Supabase.
3. Name the template exactly `supabase`.
4. Retrieve your Supabase JWT Secret from Supabase Settings > API, paste it into the Signing Key field in Clerk, and save.

### Running the App

Start the development server:

```bash
npm run dev
```

Visit http://localhost:3000 to view the application.

## License

MIT License
