This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Summary

Multichain Explorer is an alternative explorer that leverages the power of the Etherscan and PolygonScan API to display
information about the address and transactions of Ethereum and Polygon accounts.

It is deployed on vercel and is available in https://multichain-explorer-ochre.vercel.app.

### Local Development

First, add the Etherscan and Polygonscan API KEYS in a `.env.local` file:

```markdown
ETHERSCAN_API_KEY=
POLYGONSCAN_API_KEY=
```

Second, run the dev command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.
