'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

export interface QuintileDataPoint {
  quintile: string
  value: number
  label?: string
}

interface QuintileBarChartProps {
  data: QuintileDataPoint[]
  title?: string
  yAxisLabel?: string
  /** 'percent' (default) | 'hpi' (no leading +) | 'ic' (plain number) */
  formatMode?: 'percent' | 'hpi' | 'ic'
}

const QUINTILE_COLORS = [
  '#991b1b', // Q1 — negative/red
  '#b45309', // Q2 — orange
  '#5c6b7a', // Q3 — neutral/muted
  '#166534', // Q4 — positive-ish
  '#14532d', // Q5 — strong positive/green
]

function formatVal(v: number, mode: 'percent' | 'hpi' | 'ic'): string {
  if (mode === 'hpi') return `+${v.toFixed(1)}%`
  if (mode === 'ic') return `${v.toFixed(0)}`
  return `${v > 0 ? '+' : ''}${v.toFixed(1)}%`
}

export function QuintileBarChart({
  data,
  title,
  yAxisLabel = 'Annualized Return (%)',
  formatMode = 'percent',
}: QuintileBarChartProps) {
  const formatValue = (v: number) => formatVal(v, formatMode)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {title && (
        <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {title}
        </p>
      )}
      <div style={{ width: '100%', height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#c4b99a" strokeOpacity={0.4} vertical={false} />
            <XAxis
              dataKey="quintile"
              tick={{ fill: '#5c6b7a', fontSize: 11, fontFamily: 'var(--font-mono)' }}
              axisLine={{ stroke: '#c4b99a' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#5c6b7a', fontSize: 10, fontFamily: 'var(--font-mono)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${v > 0 ? '+' : ''}${v.toFixed(0)}%`}
              label={{
                value: yAxisLabel,
                angle: -90,
                position: 'insideLeft',
                offset: 10,
                style: { fill: '#5c6b7a', fontSize: 9, fontFamily: 'var(--font-mono)' },
              }}
              width={62}
            />
            <ReferenceLine y={0} stroke="#c4b99a" strokeWidth={1} />
            <Tooltip
              contentStyle={{
                background: 'var(--white)',
                border: '1px solid var(--border)',
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                color: 'var(--navy)',
                borderRadius: 0,
              }}
              formatter={(value: unknown) => [
                formatValue(Number(value)),
                'Return',
              ]}
            />
            <Bar dataKey="value" radius={0}>
              {data.map((_, i) => (
                <Cell key={i} fill={QUINTILE_COLORS[i] ?? '#5c6b7a'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p style={{ fontSize: '10px', color: 'var(--border)', fontFamily: 'var(--font-mono)' }}>
        Q1 = lowest signal quintile &nbsp;·&nbsp; Q5 = highest
      </p>
    </div>
  )
}
