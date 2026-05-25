# Supaboard

Supaboard is a Next.js application for AI email workflows. It combines inbound and outbound agent mail handling, shared inbox automation, and recruitment analysis built on IMAP, Postgres, Drizzle, and local or self-hosted LLM tooling.

## Core capabilities

- AI mail agents with thread-aware inbound and outbound handling
- External mailbox ingestion for recruitment and workflow analysis
- Talent and job extraction with pgvector-backed similarity search
- Auth, billing, storage, and admin dashboard flows

## Local development

1. Configure the required environment variables.
2. Install dependencies with `pnpm install`.
3. Run the app with `pnpm dev`.
4. Open `http://localhost:3000`.

## Useful scripts

- `pnpm lint`
- `pnpm exec tsc -p tsconfig.json --noEmit --incremental false`
- `pnpm db:migrate`
