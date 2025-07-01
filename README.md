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

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## Bugs I Encountered: 
- Working with two runtimes: Next for frontend, Node for backend made for interesting issues like modules missing because of faulty tsconfig.json setup
-  Typescript and Node work with CommonJS modules, but I was using ESNext modules by default because of my Next frontend setup

## Things I Learned:
- Full stack data flow and how everything links together
-  NextJS setup and tools:
-- The pages folder 
-- 
- Setting up NextJS frontend with a Node and Express backend, and using Typescript

## Cool New Things
- A VSCode extension that automatically adds your project file tree to your README.md
- The Concurrently Package: allows you to run multiple commands or scripts in a single terminal
<br>
```   "dev:all": "concurrently \"npm run dev\" \"npm run server\"" ``` 

quoteme
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
│  │     │  ├─ 6.pack.gz
│  │     │  ├─ 7.pack.gz
│  │     │  ├─ 8.pack.gz
│  │     │  ├─ index.pack.gz
│  │     │  └─ index.pack.gz.old
│  │     └─ server-development
│  │        ├─ 0.pack.gz
│  │        ├─ 1.pack.gz
│  │        ├─ 2.pack.gz
│  │        ├─ 3.pack.gz
│  │        ├─ 4.pack.gz
│  │        ├─ 5.pack.gz
│  │        ├─ 6.pack.gz
│  │        ├─ 7.pack.gz
│  │        ├─ index.pack.gz
│  │        └─ index.pack.gz.old
│  ├─ package.json
│  ├─ react-loadable-manifest.json
│  ├─ server
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
│  │     ├─ 1abd809e78b14cfc.webpack.hot-update.json
│  │     ├─ 633457081244afec._.hot-update.json
│  │     ├─ 7a432eba053ff8d7.webpack.hot-update.json
│  │     ├─ 9c913b723335bc3d.webpack.hot-update.json
│  │     ├─ b6c85e6e61e878dc.webpack.hot-update.json
│  │     ├─ main.7a432eba053ff8d7.hot-update.js
│  │     ├─ pages
│  │     │  ├─ _app.b6c85e6e61e878dc.hot-update.js
│  │     │  ├─ index.1abd809e78b14cfc.hot-update.js
│  │     │  ├─ index.7a432eba053ff8d7.hot-update.js
│  │     │  └─ index.9c913b723335bc3d.hot-update.js
│  │     ├─ webpack.1abd809e78b14cfc.hot-update.js
│  │     ├─ webpack.7a432eba053ff8d7.hot-update.js
│  │     ├─ webpack.9c913b723335bc3d.hot-update.js
│  │     └─ webpack.b6c85e6e61e878dc.hot-update.js
│  └─ trace
├─ README.md
├─ backend
│  ├─ supabaseclient.ts
│  └─ v1
│     ├─ api
│     │  ├─ helpers
│     │  │  └─ getUserAndClient.ts
│     │  ├─ quotes
│     │  │  ├─ controller.ts
│     │  │  ├─ model.ts
│     │  │  └─ routes.ts
│     │  ├─ routes
│     │  │  └─ auth.ts
│     │  └─ users
│     │     ├─ controller.ts
│     │     ├─ model.ts
│     │     └─ routes.ts
│     ├─ models
│     │  ├─ quote.model.ts
│     │  └─ user.model.ts
│     └─ server.ts
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
├─ src
│  ├─ components
│  │  └─ AuthForm.tsx
│  ├─ lib
│  │  └─ supabaseClient.ts
│  ├─ pages
│  │  ├─ _app.tsx
│  │  ├─ _document.tsx
│  │  ├─ api
│  │  │  └─ auth
│  │  │     ├─ login.ts
│  │  │     └─ signup.ts
│  │  ├─ index.tsx
│  │  ├─ login.tsx
│  │  └─ signup.tsx
│  ├─ services
│  │  └─ auth.ts
│  └─ styles
│     └─ globals.css
└─ tsconfig.json

```