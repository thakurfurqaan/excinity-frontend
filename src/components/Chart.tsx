import React, { useState } from 'react';
import CustomLineChart from './charts/CustomLineChart';
import CustomCandlestickChart from './charts/CustomCandlestickChart';
import { ChartType } from './charts/enum';
import ChartTypeSelector from './ChartTypeSelector';

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


const CustomChart: React.FC<Props> = ({ candles, title }: Props) => {

    const [chartType, setChartType] = useState<ChartType>(ChartType.CandlestickChart);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexDirection: 'column' }}>
                <ChartTypeSelector chartType={chartType} setChartType={setChartType} />
                {chartType === ChartType.CandlestickChart ? <CustomCandlestickChart candles={candles} title={title} /> : <CustomLineChart candles={candles} title={title} />}
            </div>
        </>
    );
};

export default CustomChart;