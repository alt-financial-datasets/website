'use client'

import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

export interface SignalLeadDataPoint {
  period: string
  signal: number
  price: number
}

interface SignalLeadChartProps {
  data: SignalLeadDataPoint[]
  signalLabel?: string
  priceLabel?: string
  title?: string
  caption?: string
}

export function SignalLeadChart({
  data,
  signalLabel = 'Signal',
  priceLabel = 'Subsequent Return (%)',
  title,
  caption,
}: SignalLeadChartProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {title && (
        <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {title}
        </p>
      )}
      <div style={{ width: '100%', height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#c4b99a" strokeOpacity={0.4} vertical={false} />
            <XAxis
              dataKey="period"
              tick={{ fill: '#5c6b7a', fontSize: 10, fontFamily: 'var(--font-mono)' }}
              axisLine={{ stroke: '#c4b99a' }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              yAxisId="signal"
              tick={{ fill: '#9a7728', fontSize: 10, fontFamily: 'var(--font-mono)' }}
              axisLine={false}
              tickLine={false}
              label={{
                value: signalLabel,
                angle: -90,
                position: 'insideLeft',
                offset: 10,
                style: { fill: '#9a7728', fontSize: 9, fontFamily: 'var(--font-mono)' },
              }}
              width={62}
            />
            <YAxis
              yAxisId="price"
              orientation="right"
              tick={{ fill: '#0f1d2e', fontSize: 10, fontFamily: 'var(--font-mono)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${v > 0 ? '+' : ''}${v.toFixed(1)}%`}
              label={{
                value: priceLabel,
                angle: 90,
                position: 'insideRight',
                offset: -4,
                style: { fill: '#0f1d2e', fontSize: 9, fontFamily: 'var(--font-mono)' },
              }}
              width={62}
            />
            <ReferenceLine yAxisId="price" y={0} stroke="#c4b99a" strokeWidth={1} />
            <Tooltip
              contentStyle={{
                background: 'var(--white)',
                border: '1px solid var(--border)',
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                color: 'var(--navy)',
                borderRadius: 0,
              }}
              formatter={(value: unknown, name: unknown) => {
                const v = Number(value)
                if (name === 'signal') return [v.toFixed(3), signalLabel]
                return [`${v > 0 ? '+' : ''}${v.toFixed(2)}%`, priceLabel]
              }}
            />
            <Line
              type="monotone"
              dataKey="signal"
              yAxisId="signal"
              stroke="#9a7728"
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 3, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="price"
              yAxisId="price"
              stroke="#0f1d2e"
              strokeWidth={1.5}
              dot={false}
              strokeDasharray="4 2"
              activeDot={{ r: 3, strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: 'flex', gap: '20px', fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '14px', height: '2px', background: '#9a7728', display: 'inline-block' }} />
          {signalLabel}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '14px', height: '2px', background: '#0f1d2e', display: 'inline-block', borderTop: '2px dashed #0f1d2e', borderImage: 'none' }} />
          {priceLabel}
        </span>
      </div>
      {caption && (
        <p style={{ fontSize: '10px', color: 'var(--border)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
          {caption}
        </p>
      )}
    </div>
  )
}
