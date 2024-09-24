import { useEffect, useState } from 'react';
import { Candle } from '../components/Chart';

const WEBSOCKET_URL = `${import.meta.env.VITE_PUBLIC_BACKEND_BASE_URL}/ws`;

export function useWebSocket(selectedSymbol: string) {
    const [candles, setCandles] = useState<Candle[]>([]);
    const [priceDirection, setPriceDirection] = useState<'up' | 'down' | null>(null);

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
            setCandles([]);
        };
    }, [selectedSymbol]);

    return { candles, priceDirection };
}