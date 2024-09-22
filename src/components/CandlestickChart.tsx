import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export interface Candle {
    timestamp: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

interface Props {
    candles: Candle[];
}

const CandlestickChart: React.FC<Props> = ({ candles }: Props) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={candles}>
                <XAxis dataKey="timestamp" />
                <YAxis domain={['dataMin', 'dataMax']} />
                <Tooltip />
                <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CandlestickChart;