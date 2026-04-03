import Link from 'next/link'
import { SidebarTabs } from '@/components/SidebarTabs'

export default function Home() {
  return (
    <div
      className="page-layout"
      style={{
        display: 'flex',
        gap: '100px',
        alignItems: 'flex-start',
        padding: '0 40px 40px',
        marginTop: '-42px',
        flexWrap: 'wrap',
      }}
    >
      {/* ── Sidebar ── */}
      <aside style={{ width: '300px', flexShrink: 0, paddingTop: '78px' }}>
        <SidebarTabs />
      </aside>

      {/* ── Main content ── */}
      <main style={{ flex: 1, minWidth: 0, paddingTop: '18px' }}>
        <h2
          style={{
            fontSize: '13px',
            marginBottom: '24px',
            color: 'var(--muted)',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 400,
          }}
        >
          Datasets
        </h2>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, 300px)',
            gap: '28px',
            justifyContent: 'start',
          }}
        >
          {/* Card 1 */}
          <Link href="/datasets/gov-spending" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="dataset-card" style={{ position: 'relative', background: 'var(--white)', border: '1px solid var(--navy)', width: '300px', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
              <span className="card-plus">+</span>
              <div style={{ padding: '20px 22px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: 'var(--navy)', fontFamily: 'var(--font-serif)', lineHeight: 1.3 }}>
                  Federal Contracts
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.65 }}>
                  Federal contract awards mapped to public company tickers, with quarterly signals that lead earnings by 30–60 days.
                </p>
              </div>
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/datasets/weather" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="dataset-card" style={{ position: 'relative', background: 'var(--white)', border: '1px solid var(--navy)', width: '300px', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
              <span className="card-plus">+</span>
              <div style={{ padding: '20px 22px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: 'var(--navy)', fontFamily: 'var(--font-serif)', lineHeight: 1.3 }}>
                  Weather
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.65 }}>
                  Regional weather signals — temperature anomalies, drought, and heating demand — mapped to energy and agricultural futures.
                </p>
              </div>
            </div>
          </Link>

          {/* Card 3 */}
          <Link href="/datasets/gov-housing" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="dataset-card" style={{ position: 'relative', background: 'var(--white)', border: '1px solid var(--navy)', width: '300px', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
              <span className="card-plus">+</span>
              <div style={{ padding: '20px 22px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: 'var(--navy)', fontFamily: 'var(--font-serif)', lineHeight: 1.3 }}>
                  Housing
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.65 }}>
                  Federal housing spending and building permits across 4,160 counties, with signals that lead home price appreciation by one to four quarters.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', marginTop: '28px', paddingTop: '14px' }}>
          <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
            Signals accessible via API.
          </p>
        </div>
      </main>
    </div>
  )
}
