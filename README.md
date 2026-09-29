# Case Study Zero — Micro-Frontend E-Commerce

An e-commerce case study split into three independently built applications that are composed at runtime with Webpack Module Federation: a Next.js host that renders the shell, a Next.js remote that owns the product catalogue, and a Create React App remote that owns the basket. Product data is read from the [FakeStore API](https://fakestoreapi.com).

## Applications

| Application    | Directory         | Stack                                                  | Port | Responsibility                               |
| -------------- | ----------------- | ------------------------------------------------------ | ---- | -------------------------------------------- |
| Host           | `host-app`        | Next.js 13.4 (App Router), React 18.2, TypeScript 5.1   | 3000 | Layout and page shell, loads both remotes     |
| Products remote | `products-remote` | Next.js 13.4, React 18.2, TypeScript 5.1               | 3001 | Product list, category filters, product detail |
| Basket remote  | `basket-remote`   | React 18.2 (Create React App 5 + CRACO), TypeScript 4.9 | 3002 | Basket state (Redux Toolkit) and basket UI    |

### Federation wiring

- `host-app/next.config.js` declares the remotes and the URLs it fetches them from:
  - `products` → `http://localhost:3001/_next/static/chunks/remoteEntry.js` (client) and `http://localhost:3001/_next/static/ssr/remoteEntry.js` (server)
  - `basket` → `http://localhost:3002/remoteEntry.js`
- `products-remote/next.config.js` exposes `./ProductsList` (`src/components/ProductsList.tsx`).
- `basket-remote/craco.config.js` exposes `./Basket` and `./basketSlice` (`src/components/Basket.tsx`, `src/store/basketSlice.ts`).
- `host-app/src/app/page.tsx` consumes both exposed modules with `next/dynamic` and `ssr: false`.

## Requirements

- Node.js 16.8 or newer (the version required by Next.js 13.4) and npm.
- The federation tooling is pinned to mid-2023 releases (`@module-federation/nextjs-mf` 6.4.0, `webpack` 5.88.2), so an LTS release from the same era is the safe choice. On Node 24 the Next.js dev server crashes while compiling with `TypeError: Cannot read properties of null (reading 'fn')`.

## Getting started

Each application is its own npm project. There is no root `package.json` and no workspace, so dependencies are installed once per directory. The repository has no lockfile, so `npm install` is used rather than `npm ci`.

### 1. Install dependencies

```bash
git clone https://github.com/oguzhan-baysal/case-study-zero.git
cd case-study-zero

(cd host-app && npm install)
(cd products-remote && npm install)
(cd basket-remote && npm install)
```

### 2. Start the remotes first, then the host

The host resolves both `remoteEntry.js` URLs while its dev server compiles, so ports 3001 and 3002 must already be serving before `host-app` starts. Run one command per terminal, in this order:

| Terminal | Directory         | Command                                    | URL                   |
| -------- | ----------------- | ------------------------------------------ | --------------------- |
| 1        | `products-remote` | `npm run dev`                              | http://localhost:3001 |
| 2        | `basket-remote`   | `npm start` (Windows) / `PORT=3002 npm start` (macOS, Linux) | http://localhost:3002 |
| 3        | `host-app`        | `npm run dev`                              | http://localhost:3000 |

Open http://localhost:3000 once all three are running.

The `start` script of `basket-remote` sets its port with the Windows CMD syntax `set PORT=3002 && craco start`, which only works on Windows. On macOS and Linux pass the port yourself:

```bash
cd basket-remote
PORT=3002 npm start
```

On Windows, `start.ps1` opens one PowerShell window per application:

```powershell
.\start.ps1
```

The script runs all three at once, so give the remotes a few seconds to become ready before the host compiles.

## Scripts

| Directory         | Development             | Production build  | Production start            |
| ----------------- | ----------------------- | ----------------- | --------------------------- |
| `host-app`        | `npm run dev` (3000)    | `npm run build`   | `npm start` (3000)          |
| `products-remote` | `npm run dev` (3001)    | `npm run build`   | `npm start` (3001)          |
| `basket-remote`   | `npm start` (3002, see above) | `npm run build` | serve the generated `build/` directory on port 3002 |

`products-remote` hard-codes `-p 3001` in its `dev` and `start` scripts. If you move an application to another port, update the matching remote URL in `host-app/next.config.js` as well.

## Features

- Runtime composition of three applications through Module Federation, with `react` and `react-dom` shared as singletons and the basket remote additionally sharing its Redux and Ant Design packages.
- Product catalogue from the FakeStore API through RTK Query, including loading and error states.
- Category filtering and product detail pages in the products remote.
- Basket management in the basket remote: add, update quantity, remove and clear items, with a running total.
- Ant Design components in all three applications.

The original product requirements are kept in `prd.md`.

## License

MIT — see [LICENSE](LICENSE).
