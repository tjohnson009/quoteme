This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.


```
pithy
├─ .next
│  ├─ build-manifest.json
│  ├─ cache
│  │  ├─ .rscinfo
│  │  ├─ swc
│  │  │  └─ plugins
│  │  │     └─ v7_macos_x86_64_9.0.0
│  │  └─ webpack
│  │     ├─ client-development
│  │     │  ├─ 0.pack.gz
│  │     │  ├─ 1.pack.gz
│  │     │  ├─ 2.pack.gz
│  │     │  ├─ 3.pack.gz
│  │     │  ├─ 4.pack.gz
│  │     │  ├─ 5.pack.gz
│  │     │  ├─ index.pack.gz
│  │     │  └─ index.pack.gz.old
│  │     └─ server-development
│  │        ├─ 0.pack.gz
│  │        ├─ 1.pack.gz
│  │        ├─ 2.pack.gz
│  │        ├─ 3.pack.gz
│  │        ├─ 4.pack.gz
│  │        ├─ index.pack.gz
│  │        └─ index.pack.gz.old
│  ├─ package.json
│  ├─ react-loadable-manifest.json
│  ├─ server
│  │  ├─ _error.js
│  │  ├─ interception-route-rewrite-manifest.js
│  │  ├─ middleware-build-manifest.js
│  │  ├─ middleware-manifest.json
│  │  ├─ middleware-react-loadable-manifest.js
│  │  ├─ next-font-manifest.js
│  │  ├─ next-font-manifest.json
│  │  ├─ pages
│  │  │  ├─ _app.js
│  │  │  ├─ _document.js
│  │  │  ├─ _error.js
│  │  │  └─ index.js
│  │  ├─ pages-manifest.json
│  │  ├─ vendor-chunks
│  │  │  ├─ @swc.js
│  │  │  └─ next.js
│  │  └─ webpack-runtime.js
│  ├─ static
│  │  ├─ chunks
│  │  │  ├─ _error.js
│  │  │  ├─ main.js
│  │  │  ├─ pages
│  │  │  │  ├─ _app.js
│  │  │  │  ├─ _error.js
│  │  │  │  └─ index.js
│  │  │  ├─ polyfills.js
│  │  │  ├─ react-refresh.js
│  │  │  └─ webpack.js
│  │  ├─ development
│  │  │  ├─ _buildManifest.js
│  │  │  └─ _ssgManifest.js
│  │  ├─ media
│  │  │  ├─ 569ce4b8f30dc480-s.p.woff2
│  │  │  ├─ 747892c23ea88013-s.woff2
│  │  │  ├─ 8d697b304b401681-s.woff2
│  │  │  ├─ 93f479601ee12b01-s.p.woff2
│  │  │  ├─ 9610d9e46709d722-s.woff2
│  │  │  └─ ba015fad6dcf6784-s.woff2
│  │  └─ webpack
│  │     ├─ 633457081244afec._.hot-update.json
│  │     ├─ edb8c099fdce909d.webpack.hot-update.json
│  │     └─ webpack.edb8c099fdce909d.hot-update.js
│  └─ trace
├─ README.md
├─ backend
│  ├─ middleware
│  ├─ quotes
│  ├─ server.tsx
│  └─ users
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ favicon.ico
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ randomNotesGovTech.txt
├─ src
│  ├─ pages
│  │  ├─ _app.tsx
│  │  ├─ _document.tsx
│  │  └─ index.tsx
│  └─ styles
│     └─ globals.css
└─ tsconfig.json

```