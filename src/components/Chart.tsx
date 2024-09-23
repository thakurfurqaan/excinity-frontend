import React, { useState } from 'react';
import LineChart from './charts/CustomLineChart';
import CandlestickChart from './charts/CustomCandlestickChart';

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


const CustomChart: React.FC<Props> = ({ candles }: Props) => {

    const [chartType, setChartType] = useState<'CandlestickChart' | 'LineChart'>('CandlestickChart');

    return (
        <>
            <div>
                <label htmlFor="chartType">Select Chart Type: </label>
                <select
                    id="chartType"
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value as 'CandlestickChart' | 'LineChart')}
                >
                    <option value="CandlestickChart">Candlestick Chart</option>
                    <option value="LineChart">Line Chart</option>
                </select>
                {chartType === 'CandlestickChart' ? <CandlestickChart candles={candles} /> : <LineChart candles={candles} />}
            </div>
        </>
    );
};

export default CustomChart;