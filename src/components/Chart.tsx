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
    title: string;
}

export enum ChartType {
    CandlestickChart = 'CandlestickChart',
    LineChart = 'LineChart',
}


const CustomChart: React.FC<Props> = ({ candles, title }: Props) => {

    const [chartType, setChartType] = useState<ChartType>(ChartType.CandlestickChart);

    return (
        <>
            <div>
                <label htmlFor="chartType">Select Chart Type: </label>
                <select
                    id="chartType"
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value as ChartType)}
                >
                    <option value={ChartType.CandlestickChart}>Candlestick Chart</option>
                    <option value={ChartType.LineChart}>Line Chart</option>
                </select>
                {chartType === ChartType.CandlestickChart ? <CandlestickChart candles={candles} title={title} /> : <LineChart candles={candles} title={title} />}
            </div>
        </>
    );
};

export default CustomChart;