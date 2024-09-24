import { useState } from 'react';
import './App.css';
import CustomChart from './components/Chart';
import SymbolSelector from './components/SymbolSelector';
import LatestPrice from './components/LatestPrice';
import { useWebSocket } from './hooks/useWebSocket';

const SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'PEPEUSDT'];

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState(SYMBOLS[0]);
  const { candles, priceDirection } = useWebSocket(selectedSymbol);

  return (
    <div className="App">
      <h1>Simple Trading System</h1>
      <SymbolSelector symbols={SYMBOLS} selectedSymbol={selectedSymbol} onSelectSymbol={setSelectedSymbol} />
      <LatestPrice candles={candles} priceDirection={priceDirection} />
      <CustomChart candles={candles} title={selectedSymbol} />
    </div>
  );
}

export default App;