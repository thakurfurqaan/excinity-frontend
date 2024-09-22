import { useEffect, useState } from 'react';
import './App.css';
import CandlestickChart, { Candle } from './components/CandlestickChart';


const symbols = ['BTCUSDT', 'ETHUSDT', 'PEPEUSDT'];

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState(symbols[0]);
  const [latestPrice, setLatestPrice] = useState<number | null>(null);
  const [priceDirection, setPriceDirection] = useState<'up' | 'down' | null>(null);
  const [candles, setCandles] = useState<Candle[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/ws');

    ws.onmessage = (event) => {
      const candle = JSON.parse(event.data);
      console.log(candle);
      if (candle.symbol.toLowerCase() === selectedSymbol.toLowerCase()) {
        setCandles((prevCandles) => [...prevCandles, candle]);
        setLatestPrice(candle.close);
        setPriceDirection(prevPrice => prevPrice !== null && candle.close > prevPrice ? 'up' : 'down');
      }
    };

    return () => {
      ws.close();
    };
  }, [selectedSymbol]);

  return (
    <div className="App">
      <h1>Trading Chart</h1>
      <select value={selectedSymbol} onChange={(e) => setSelectedSymbol(e.target.value)}>
        {symbols.map((symbol) => (
          <option key={symbol} value={symbol}>{symbol}</option>
        ))}
      </select>
      <div className={`latest-price ${priceDirection}`}>
        Latest Price: {latestPrice}
      </div>
      <CandlestickChart candles={candles} />
    </div>
  );
}

export default App;