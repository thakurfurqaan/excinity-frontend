import React from 'react';
import { ChartType } from './charts/enum';

interface Props {
    chartType: ChartType;
    setChartType: (chartType: ChartType) => void;
}

const ChartTypeSelector: React.FC<Props> = ({ chartType, setChartType }) => {
    return (
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
        </div>
    );
};

export default ChartTypeSelector;