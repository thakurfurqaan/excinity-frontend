import Chart from 'react-google-charts';
import { Candle } from '../Chart';

interface Props {
    candles: Candle[];
    title: string;
}

const CustomCandlestickChart: React.FC<Props> = ({ candles, title }: Props) => {

    const getData = () => {
        return [["day", "a", "b", "c", "d",], ...candles.map((candle) => {
            return [
                new Date(candle.timestamp),
                candle.low,
                candle.open,
                candle.close,
                candle.high,
            ]
        })]
    }

    const options = {
        legend: "none",
        title: title,
        bar: { groupWidth: "90%" },
        candlestick: {
            fallingColor: { strokeWidth: 1, fill: "#a52714", stroke: "#7a1b10" },
            risingColor: { strokeWidth: 1, fill: "#0f9d58", stroke: "#0b7a45" },
        },
        chartArea: {
            width: "90%",
            left: "5%",
        },

    }

    return (
        <div style={{ width: '100%', height: '400px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)', padding: '20px' }}>
            <Chart
                chartType="CandlestickChart"
                width="1000px"
                height="400px"
                data={getData()}
                options={options}
            />
        </div>
    );
};

export default CustomCandlestickChart;