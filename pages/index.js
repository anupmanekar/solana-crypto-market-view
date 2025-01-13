import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home({ tokens }) {
  const router = useRouter();

  const handleTokenClick = (token) => {
    router.push(`/token/${token.id}`);
  };

  return (
    <div>
      <h1>Solana Blockchain Tokens</h1>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Market Value</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.id} onClick={() => handleTokenClick(token)}>
              <td>{token.name}</td>
              <td>{token.marketValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch the market data from Coinmarketcap API
  const res = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=your_api_key');
  const data = await res.json();
  const tokens = data.data.map(token => ({
    id: token.id,
    name: token.name,
    marketValue: token.quote.USD.price
  }));

  return {
    props: {
      tokens,
    },
  };
}
