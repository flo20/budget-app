## Project

Tally: a personal finance dashboard (transactions, category budgets, cash flow, assets, liabilities, pinned recurring payments, savings goals, monthly notes). The code is plain JavaScript, not TypeScript, and the `@/*` alias maps to `src/*`.

## Tech stack

- **Framework:** Next.js 16.2 (App Router, Server Components, Server Actions), React 19.2
- **Language:** JavaScript (`.js`/`.jsx`). The README lists TypeScript, but the code has none yet; migrating to it is on the roadmap.
- **Backend / data:** Supabase (`@supabase/ssr` and `@supabase/supabase-js`): Postgres with Row Level Security, email/password auth and anonymous auth for demo sessions
- **Styling:** SCSS Modules (`sass`), Tailwind CSS v4 (`@tailwindcss/postcss`, `tw-animate-css`)
- **UI primitives:** shadcn/ui (style `base-vega`) on `@base-ui/react`, plus `class-variance-authority`, `clsx` and `tailwind-merge`
- **Icons:** `lucide-react`
- **Charts:** Recharts 3
- **Forms:** native `<form action>` with React's `useActionState` (`react-hook-form` is installed)
- **Linting:** ESLint 9 with `eslint-config-next`
- **Hosting:** Vercel

## Commands

- `npm run dev`: start the dev server
- `npm run build`: production build
- `npm run lint`: ESLint (flat config, `core-web-vitals`)

The project has no test suite yet. Local development needs `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local`. The database schema, RLS policies and column defaults live in Supabase, not in this repo.

## Architecture

**Session refresh.** `proxy.js` at the repo root is Next 16's replacement for `middleware.js`. It refreshes the Supabase session cookie on every non-static request.

**Auth gate.** `src/lib/auth/require-user.js` (`server-only`) creates the server Supabase client, redirects to `/signin` when no user is found, and returns `{ supabase, user }`. Every query and server action starts with `requireUser()`. They also filter by `user_id` explicitly, on top of RLS.

**Data flow, in layers:**
1. `src/lib/queries/*`: `server-only` read functions, one per domain. They call Supabase and throw on error.
2. `src/lib/{dashboard,budget,assets,chart}/*`: pure functions that aggregate raw rows into display summaries (for example `buildMonthlyPulseSummary`, `getCashFlowData`).
3. `src/components/<Feature>/<Feature>.js`: async Server Components that fetch through queries, summarise, and render. Interactive parts are split into `*Client.js` or form components marked `'use client'`.
4. `src/app/actions/*`: `'use server'` mutations, one file per domain.

**The dashboard is a single page.** `src/app/dashboard/page.js` composes every feature section. The selected month comes from the `?month=YYYY-MM` search param: `normalizeMonth` then `toBudgetMonth` turns it into a `YYYY-MM-01` "budget month" string, which is passed as a prop to month-scoped sections. Month-scoped queries filter `transaction_date >= budgetMonth AND < nextMonth`.

**Server action contract.** Actions take `(_previousState, formData)`, validate on the server, and return `{ success, error }` rather than throwing. After a write they call `revalidatePath('/dashboard')`. Client forms consume them through `useFormAction(action, onSuccess)` in `src/components/hooks/useFormActions.js`, which wraps `useActionState`. Forms are built from the primitives in `src/components/Form`.

**Global client state.** `src/app/providers/GlobalProvider.js` holds the theme (light/dark through `data-theme` on `<html>`, set before hydration by an inline script in `layout.js`) and a single `activeModal` name. Each modal has a `show*`/`open*`/`close*` trio exposed through `useModal()`. A new modal needs a new trio added there.

**Demo accounts.** `signInAsDemo` in `src/app/actions/auth.js` calls `supabase.auth.signInAnonymously()` and then `seedDemoData` (`src/lib/demo/seedDemoData.js`), which inserts sample rows dated relative to the current month. Schema changes to any table usually need matching updates to the seed data.

**Supabase tables:** `transactions`, `category_budgets`, `budget_notes`, `assets`, `liabilities`, `pinned_payments`, `savings_goals`.

**Categories** are hard-coded today in `src/lib/constants/transaction-categories.js` (`EXPENSE_CATEGORIES`, `INCOME_CATEGORIES`). The roadmap's "custom categories" feature is meant to replace them, and they are used by the new-entry form and the budget allocation components and actions.

## Styling

Feature components use co-located SCSS Modules (`<Feature>.module.scss`). Tailwind and shadcn are used only for the primitives in `src/components/ui/`, which are JSX, not TSX. Global tokens and theme variables live in `src/app/globals.css`. Charts use Recharts through the shadcn `chart.jsx` wrapper, with configs in `src/lib/constants/chart-configs.js`.
