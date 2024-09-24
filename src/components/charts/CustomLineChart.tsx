import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Candle } from '../Chart';

const CustomLineChart = ({ candles, title }: { candles: Candle[], title: string }) => {
    return (
        <div style={{ borderRadius: '10px', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)', padding: '10px' }}>
            <h2>{title}</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={candles}>
                    <XAxis dataKey="timestamp" />
                    <YAxis domain={['dataMin', 'dataMax']} />
                    <Tooltip />
                    <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomLineChart;