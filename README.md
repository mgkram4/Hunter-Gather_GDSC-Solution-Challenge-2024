This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Migrations

First sync with the database:

```bash
supabase login
supabase link --project-ref <project_ref>
supabase db pull
```

Create a new migration:

```bash
supabase migration new <migration_name>
```

Push it to the production database:

```bash
supabase db push
```
