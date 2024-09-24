import React from 'react';
import { Candle } from './Chart';

interface LatestPriceProps {
    candles: Candle[];
    priceDirection: 'up' | 'down' | null;
}

const LatestPrice: React.FC<LatestPriceProps> = ({ candles, priceDirection }) => {
    return (
        <div className={`latest-price ${priceDirection}`}>
            {candles.length > 0 && (
                <h4>Latest Price:
                    &nbsp;<span style={{ color: candles[candles.length - 1]?.close > candles[candles.length - 2]?.close ? 'green' : 'red' }}>{candles[candles.length - 1]?.close}</span>
                </h4>
            )}
        </div>
    );
};

export default LatestPrice;