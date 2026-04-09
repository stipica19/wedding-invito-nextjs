# Worklog (2026-03-15)

## Update (2026-03-18)

- RSVP validation hardened:
  - `name` is now trimmed with clearer min/max validation messages.
  - `guestsCount` rules now depend on `attending` (`yes` requires >= 1, `no` requires 0).
  - `message` is trimmed and normalized when empty.
- Public RSVP API now normalizes `guestsCount` for non-attending responses.
- RSVP form UX improved:
  - better defaults (`guestsCount` starts at 1 for attending users)
  - auto-adjusts guest count when `attending` changes
  - disables guest count input when user selects `no`
  - maps server field validation errors back to form fields
- Removed `no-explicit-any` lint errors in auth and invitation APIs by using typed session access.
- Implemented invitation details page with RSVP analytics and full RSVP list:
  - route: `app/dashboard/invitations/[id]/page.tsx`
  - list page now links to details (`Detalji i RSVP`).
- Invitation RSVP detail page now supports:
  - status filter (`all/yes/maybe/no`)
  - text search (name/message)
  - CSV export via `GET /api/invitations/[id]/rsvps?format=csv`.
- Added convenience redirect page:
  - `app/invitations/[id]/page.tsx` now redirects to `/dashboard/invitations/[id]`.
- Public invitation display upgraded:
  - `components/InvitationPreview.tsx` now renders structured invitation content
    (couple/title, subtitle, date, time, location, hosts, dressCode, note).
  - `app/[slug]/page.tsx` now forwards `selectedColor` and full `data` into preview.
- Invitation create form expanded in `app/create/[templateId]/page.tsx`:
  - added inputs for subtitle, time, location, hosts, dressCode, and note
  - payload `data` now includes all fields used by public invitation preview.
- Template seeding upgraded to 3 invitation templates in `app/api/dev/seed-templates/route.ts`:
  - `Classic Wedding`
  - `Garden Romance`
  - `Modern Minimal`
  - implemented idempotent upsert behavior for repeatable seeding.
- Templates gallery now shows visual preview cards:
  - `components/TemplateCard.tsx` renders mini invitation preview from `defaultData`
  - `app/templates/page.tsx` now passes `defaultData` and `colorVariants` into cards.
- Template layouts are now structurally different (not just colors):
  - added `layout` in template `defaultData` (`classic`, `garden`, `modern`)
  - `TemplateCard` renders different arrangement per layout
  - `InvitationPreview` renders different public invitation structure per layout
  - creator form now lets user choose `layout` when creating invitation.
- Added dedicated noir-style `ClassicTemplate` component in `components/templates/ClassicTemplate.tsx`
  and wired it through template registry into `InvitationPreview`.

## Implemented

- NextAuth login/register flow wired and route protection improved.
- Middleware now enforces:
  - `/dashboard/*` authenticated users only
  - `/admin/*` admin users only
  - `/login` and `/register` redirect authenticated users to `/dashboard`
- Admin API routes secured with auth + role checks.
- Invitation owner checks added for private invitation APIs.
- Public invitation lookup and RSVP submission endpoints implemented.
- Type fixes for Mongoose ObjectId usage in models.
- Template creation flow enabled:
  - dev template seeding endpoint
  - templates listing endpoint
  - template list page with create links
  - create invitation page connected to API
- Public invitation page (`/[slug]`) now fetches and renders invitation + RSVP form.
- Dashboard implemented with invitation stats, recent invitations, full list page, and copy URL action.

## Key Files

- `middleware.ts`
- `lib/auth.ts`
- `app/api/invitations/route.ts`
- `app/api/invitations/[id]/route.ts`
- `app/api/invitations/[id]/rsvps/route.ts`
- `app/api/public/invitations/[slug]/route.ts`
- `app/api/public/invitations/[slug]/rsvp/route.ts`
- `app/api/templates/route.ts`
- `app/api/dev/seed-templates/route.ts`
- `app/[slug]/page.tsx`
- `app/templates/page.tsx`
- `app/create/[templateId]/page.tsx`
- `app/dashboard/page.tsx`
- `app/dashboard/invitations/page.tsx`
- `components/RSVPForm.tsx`
- `components/CopyInviteLinkButton.tsx`
- `models/Invitation.ts`
- `models/RSVP.ts`

## Next Suggested Steps

1. Implement real admin invitation status update in `app/api/admin/invitations/[id]/route.ts`.
2. Add RSVP list page per invitation in dashboard.
3. Improve template preview/detail and prefill creation form with template defaults.
4. Remove or harden dev-only seed endpoint before production.
