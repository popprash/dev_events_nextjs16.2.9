# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into the DevEvents Next.js App Router project. PostHog is initialized via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+), with a reverse proxy configured in `next.config.ts` to route telemetry through `/ingest`. Two client-side events are captured: one when the user clicks "Explore Events" and one when they click any event card, with rich properties (event title, slug, location, date) attached to the latter.

| Event Name | Description | File |
|---|---|---|
| `explore_clicked` | User clicked the "Explore Events" button on the homepage to browse available events. | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked on an event card to view the full details of a specific developer event. | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/482935/dashboard/1750668)
- [Explore Button Clicks](https://us.posthog.com/project/482935/insights/xguKbepc)
- [Event Card Clicks Over Time](https://us.posthog.com/project/482935/insights/3XHZB4xY)
- [Top Events by Clicks](https://us.posthog.com/project/482935/insights/RaxaFSZ8)
- [Explore to Event Click Funnel](https://us.posthog.com/project/482935/insights/EtHkkFWU)
- [Total Event Card Clicks (30d)](https://us.posthog.com/project/482935/insights/sxMN5LO3)

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
