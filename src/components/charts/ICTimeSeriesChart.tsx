'use client'

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

export interface ICDataPoint {
  period: string
  ic: number
  cumulative_ic: number
}

interface ICTimeSeriesChartProps {
  data: ICDataPoint[]
  title?: string
  meanIC?: number
  tStat?: number
}

export function ICTimeSeriesChart({ data, title, meanIC, tStat }: ICTimeSeriesChartProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
        {title && (
          <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {title}
          </p>
        )}
        {(meanIC !== undefined || tStat !== undefined) && (
          <span style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
            {meanIC !== undefined && `Mean IC: ${meanIC > 0 ? '+' : ''}${(meanIC * 100).toFixed(2)}%`}
            {meanIC !== undefined && tStat !== undefined && '  ·  '}
            {tStat !== undefined && `t = ${tStat.toFixed(2)}`}
          </span>
        )}
      </div>
      <div style={{ width: '100%', height: 220 }}>
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
              yAxisId="ic"
              tick={{ fill: '#5c6b7a', fontSize: 10, fontFamily: 'var(--font-mono)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`}
              label={{
                value: 'IC',
                angle: -90,
                position: 'insideLeft',
                offset: 10,
                style: { fill: '#5c6b7a', fontSize: 9, fontFamily: 'var(--font-mono)' },
              }}
              width={52}
            />
            <YAxis
              yAxisId="cum"
              orientation="right"
              tick={{ fill: '#5c6b7a', fontSize: 10, fontFamily: 'var(--font-mono)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`}
              width={52}
            />
            <ReferenceLine yAxisId="ic" y={0} stroke="#c4b99a" strokeWidth={1} />
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
                const label = name === 'ic' ? 'IC' : 'Cumulative IC'
                return [`${v > 0 ? '+' : ''}${(v * 100).toFixed(2)}%`, label]
              }}
            />
            <Bar dataKey="ic" yAxisId="ic" radius={0}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.ic >= 0 ? 'rgba(22,101,52,0.6)' : 'rgba(153,27,27,0.6)'} />
              ))}
            </Bar>
            <Line
              type="monotone"
              dataKey="cumulative_ic"
              yAxisId="cum"
              stroke="var(--navy)"
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 3, strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p style={{ fontSize: '10px', color: 'var(--border)', fontFamily: 'var(--font-mono)' }}>
        Bars: per-period IC &nbsp;·&nbsp; Line: cumulative IC
      </p>
    </div>
  )
}
