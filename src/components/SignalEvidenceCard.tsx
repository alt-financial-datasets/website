interface EvidenceMetric {
  label: string
  value: string
  positive?: boolean
  negative?: boolean
}

interface SignalEvidenceCardProps {
  signalName: string
  description: string
  metrics: EvidenceMetric[]
}

export function SignalEvidenceCard({ signalName, description, metrics }: SignalEvidenceCardProps) {
  return (
    <div
      style={{
        border: '1px solid var(--border)',
        padding: '18px 20px',
        background: 'var(--white)',
      }}
    >
      <div style={{ marginBottom: '10px' }}>
        <code
          style={{
            fontSize: '11px',
            color: 'var(--gold)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.3px',
          }}
        >
          {signalName}
        </code>
        <p
          style={{
            fontSize: '13px',
            color: 'var(--muted)',
            lineHeight: 1.6,
            marginTop: '4px',
          }}
        >
          {description}
        </p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
        {metrics.map((m, i) => (
          <div key={i}>
            <div
              style={{
                fontSize: '15px',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: m.positive ? 'var(--positive)' : m.negative ? 'var(--negative)' : 'var(--navy)',
                letterSpacing: '-0.3px',
              }}
            >
              {m.value}
            </div>
            <div
              style={{
                fontSize: '10px',
                color: 'var(--muted)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontFamily: 'var(--font-mono)',
                marginTop: '2px',
              }}
            >
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
