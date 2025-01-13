import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Token({ token }) {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      router.push('/');
    }
  }, [id]);

  return (
    <div>
      <h1>{token.name} Trading View</h1>
      <div id="tradingview-widget-container">
        <div id="tradingview-widget"></div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://api.example.com/solana-tokens/${id}`);
  const token = await res.json();

  return {
    props: {
      token,
    },
  };
}

useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://s3.tradingview.com/tv.js';
  script.async = true;
  script.onload = () => {
    new TradingView.widget({
      width: 980,
      height: 610,
      symbol: `SOLANA:${token.symbol}`,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'light',
      style: '1',
      locale: 'en',
      toolbar_bg: '#f1f3f6',
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: 'tradingview-widget',
    });
  };
  document.body.appendChild(script);
}, [token.symbol]);
