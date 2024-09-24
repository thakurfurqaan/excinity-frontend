import { useEffect, useState } from 'react';
import './App.css';
import CustomChart, { Candle } from './components/Chart';


const symbols = ['BTCUSDT', 'ETHUSDT', 'PEPEUSDT'];
const WEBSOCKET_URL = `${import.meta.env.VITE_PUBLIC_BACKEND_BASE_URL}/ws`

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState(symbols[0]);
  const [priceDirection, setPriceDirection] = useState<'up' | 'down' | null>(null);
  const [candles, setCandles] = useState<Candle[]>([]);

  useEffect(() => {
    const ws = new WebSocket(`${WEBSOCKET_URL}/${selectedSymbol}`);

    ws.onmessage = (event) => {
      const candle = JSON.parse(event.data);
      if (candle.symbol.toLowerCase() === selectedSymbol.toLowerCase()) {
        setCandles((prevCandles) => {
          if (prevCandles.length === 0 || prevCandles[prevCandles.length - 1].timestamp !== candle.timestamp) {
            return [...prevCandles, candle];
          } else {
            const newCandles = [...prevCandles];
            newCandles[newCandles.length - 1] = candle;
            return newCandles;
          }
        });
        setPriceDirection(prevPrice => prevPrice !== null && candle.close > prevPrice ? 'up' : 'down');
      }
    };

    ws.onclose = () => {
      setCandles([]);
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
        {candles.length > 0 && (
          <h4>Latest Price:
            &nbsp;<span style={{ color: candles[candles.length - 1]?.close > candles[candles.length - 2]?.close ? 'green' : 'red' }}>{candles[candles.length - 1]?.close}</span>
          </h4>
        )}
      </div>
      <CustomChart candles={candles} title={selectedSymbol} />
    </div>
  );
}

export default App;