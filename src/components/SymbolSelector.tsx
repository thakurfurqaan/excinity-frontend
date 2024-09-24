import React from 'react';

interface SymbolSelectorProps {
    symbols: string[];
    selectedSymbol: string;
    onSelectSymbol: (symbol: string) => void;
}

const SymbolSelector: React.FC<SymbolSelectorProps> = ({ symbols, selectedSymbol, onSelectSymbol }) => {
    return (
        <select value={selectedSymbol} onChange={(e) => onSelectSymbol(e.target.value)}>
            {symbols.map((symbol) => (
                <option key={symbol} value={symbol}>{symbol}</option>
            ))}
        </select>
    );
};

export default SymbolSelector;