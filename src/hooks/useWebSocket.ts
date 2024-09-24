import { useEffect, useState, useCallback, useRef } from 'react';
import { Candle } from '../components/Chart';

const WEBSOCKET_URL = `${import.meta.env.VITE_PUBLIC_BACKEND_BASE_URL || 'ws://localhost:8080'}/ws`;
const MAX_RETRIES = 5;
const INITIAL_RETRY_DELAY = 1000;

export function useWebSocket(selectedSymbol: string) {
    const [candles, setCandles] = useState<Candle[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);
    const retriesRef = useRef(0);

    const connect = useCallback(() => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            return;
        }

        wsRef.current = new WebSocket(`${WEBSOCKET_URL}/${selectedSymbol}`);

        wsRef.current.onopen = () => {
            console.log('WebSocket connected');
            setIsConnected(true);
            retriesRef.current = 0;
        };

        wsRef.current.onmessage = (event) => {
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
            }
        };

        wsRef.current.onclose = (event) => {
            console.log('WebSocket disconnected', event.reason);
            setIsConnected(false);
            retry();
        };

        wsRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
            wsRef.current?.close();
        };
    }, [selectedSymbol]);

    const retry = useCallback(() => {
        if (retriesRef.current >= MAX_RETRIES) {
            console.log('Max retries reached. Stopping reconnection attempts.');
            return;
        }

        const delay = INITIAL_RETRY_DELAY * Math.pow(2, retriesRef.current);
        console.log(`Reconnecting in ${delay}ms...`);

        setTimeout(() => {
            retriesRef.current++;
            connect();
        }, delay);
    }, [connect]);

    useEffect(() => {
        connect();

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
            setCandles([]);
            setIsConnected(false);
            retriesRef.current = 0;
        };
    }, [selectedSymbol, connect]);

    return { candles, isConnected };
}