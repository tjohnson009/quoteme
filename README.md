# [QuoteMe](https://github.com/tjohnson009/quoteme)
This is a fullstack web app for saving and managing your favorite quotes. Built with Next.js, React, Express, and Supabase.  

### Live Demo: https://github.com/tjohnson009/quoteme 

## Tech Stack
- TypeScript
- React
- Next.js
- TailwindCSS
- Express
- Supabase (PostgreSQL + Auth)
- Deployed with Vercel and Render

## How The App Is Designed / Architecture: 
The frontend of the app is designed using React. Saving a quote makes a request to my Next.js API routes, then from the Next.js API routes the request is forwarded to my Express server. This allows me to bypass CORS issues when sending a request to another URL. CORS issues are browser related. The Next.js API route and Express server can communicate with no issues because they are both servers. This is called the proxy pattern because the Next.js API acts as a proxy. All requests follow this pattern: Browser action -> Next.js API route -> Express -> Supabase. 

 ## Running QuoteMe Locally
  1. Clone the repo
     ```bash
     git clone https://github.com/tjohnson009/quoteme.git
     cd quoteme

  2. Install dependencies
  npm install
  3. Create a .env.local file in the project root
  NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
  NEXT_PUBLIC_EXPRESS_API=http://localhost:5000
  4. Create a .env file in the project root
  SUPABASE_URL=your-supabase-url
  SUPABASE_ANON_KEY=your-anon-key
  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
  5. Start both servers
  npm run dev:all
  5. Next.js runs on http://localhost:3000, Express on http://localhost:5000.

## Bugs I Encountered: 
- Working with two runtimes: Next for frontend, and Node for backend made for interesting issues like modules missing because of faulty tsconfig.json setup
-  Typescript and Node work with CommonJS modules, but I was using ESNext modules by default because of my Next frontend setup

## Things I Learned:
- Full stack data flow and how everything links together
-  NextJS setup and tools:
-- The pages folder 
-- Next.js API routes
- Setting up NextJS frontend with a Node and Express backend, and using Typescript
-  The Concurrently Package: allows you to run multiple commands or scripts in a single terminal:
<br>
    "dev:all": "concurrently \"npm run dev\" \"npm run server\"" --- npm run dev:all
