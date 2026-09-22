This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Project home configurations live in the server-only `data/projectLayouts.ts` file,
keyed by project slug. The eight initial configurations use the supplied research pack;
no project drawings or photographs were supplied. The 2 BHK and 3 BHK pages use
25 locally stored reference plans grouped by the source's bedroom counts
(18 two-bedroom and 7 three-bedroom plans). The 1 BHK and 4 BHK pages have no matching
samples and show the request panel. Provenance, dimensions, and bedroom mappings
are recorded in `data/temporaryFloorPlans.json`.

To add real assets, place the files in `public/projects/` and populate the layout's
optional `floorPlans` and `photos` arrays. Each image needs `src` (a public URL path),
`label`, descriptive `alt`, and its actual pixel `width` and `height`. An optional
`pdf` record takes `src` and `label`. Only add project-specific, verified assets;
omit unavailable records. Replace each layout's `floorPlans: temporaryFloorPlans(...)`
with its actual image array and omit `isTemporaryPreview` on verified drawings.
This automatically removes the temporary-preview notice. The viewer, labeled plan selection, PDF link, and photo
gallery appear automatically. Rebuild after changing the data.

After building and starting the site, run `node scripts/check-layouts.mjs` to check
all eight routes, navigation, metadata, sitemap, local preview assets and 404s.
Update the preview checks when original plans replace the Era references.

Floor-plan data stays out of shared client bundles, and the image lightbox loads
on demand. The hero uses `Home-2-1-web.mp4`: identical video frames to the original,
with its unused audio removed and MP4 metadata moved to the front for fast playback.
The original video is retained. Run `node scripts/check-performance.mjs` after a
production build to check the page payloads and lazy-loading boundaries.

Create `.env.local` and configure the server-side contact delivery webhook:

```env
CONTACT_FORM_WEBHOOK_URL=https://your-secure-form-endpoint.example/submit
```

The endpoint receives a JSON object containing the validated contact fields. If the
variable is missing or the delivery service rejects a request, the website shows a
phone fallback instead of incorrectly reporting that the message was sent.

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
