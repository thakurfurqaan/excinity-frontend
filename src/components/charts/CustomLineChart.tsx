import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Candle } from '../Chart';

const CustomLineChart = ({ candles }: { candles: Candle[] }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={candles}>
                <XAxis dataKey="timestamp" />
                <YAxis domain={['dataMin', 'dataMax']} />
                <Tooltip />
                <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default CustomLineChart;