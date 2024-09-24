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
      <h1 style={{ textAlign: 'center', margin: '0' }}>Simple Trading System</h1>
      <div className="header" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <SymbolSelector symbols={SYMBOLS} selectedSymbol={selectedSymbol} onSelectSymbol={setSelectedSymbol} />
        <LatestPrice candles={candles} priceDirection={priceDirection} />
      </div>
      <CustomChart candles={candles} title={selectedSymbol} />
    </div>
  );
}

export default App;