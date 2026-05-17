import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TopBar from './TopBar';
import { getCurrentApiUrl, getBatches } from '../services/apiService';

const FEATURES = [
  { icon: '💎', title: 'Premium Content — Free', desc: 'Top paid batches at zero cost' },
  { icon: '📱', title: '100% App-Like Experience', desc: 'Smooth & fast, just like native' },
  { icon: '🔒', title: 'Secure & Safe', desc: 'Your data is fully protected' },
  { icon: '🚀', title: 'Always Updated', desc: 'New batches added regularly' },
];

const HomePage = ({ onMenuClick }) => {
  const router = useRouter();
  const [courseCount, setCourseCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await getCurrentApiUrl();
        const res = await getBatches();
        const data = res.data || res || [];
        setCourseCount(Array.isArray(data) ? data.length : null);
      } catch (e) {
        setCourseCount(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div style={{ background: '#080c12', minHeight: '100vh' }}>
      <TopBar title="Dark Universe" onMenuClick={onMenuClick} />

      <div style={{ padding: '0 16px 32px' }}>

        {/* Hero Section */}
        <div className="fade-in-up" style={{ textAlign: 'center', padding: '28px 0 24px' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            background: 'rgba(245,158,11,0.1)',
            border: '1px solid rgba(245,158,11,0.22)',
            borderRadius: '100px', padding: '6px 16px',
            marginBottom: '18px',
          }}>
            <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              ✨ Premium Education — 100% Free
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 900,
            lineHeight: 1.12,
            marginBottom: '13px',
            fontSize: 'clamp(24px, 7.5vw, 42px)',
          }}>
            <span style={{ color: '#f1f5f9' }}>Learn from </span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 60%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Dark Universe
            </span>
          </h1>

          <p style={{
            fontSize: '14px', color: '#64748b',
            maxWidth: '270px', margin: '0 auto 26px',
            lineHeight: 1.65,
          }}>
            India's premium free learning platform. Top quality courses, completely free.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => router.push('/courses')}
            style={{
              padding: '14px 36px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              border: 'none', borderRadius: '14px',
              color: '#000', fontWeight: 800,
              fontSize: '15px', cursor: 'pointer',
              boxShadow: '0 10px 28px rgba(245,158,11,0.42)',
              letterSpacing: '0.01em',
              WebkitTapHighlightColor: 'transparent',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
            }}
          >
            <span>🚀</span> Explore Courses
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '11px', marginBottom: '22px' }}>

          {/* Dynamic course count - full width */}
          <div style={{
            gridColumn: '1 / -1',
            background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(217,119,6,0.07) 100%)',
            border: '1px solid rgba(245,158,11,0.22)',
            borderRadius: '18px', padding: '18px 20px',
            display: 'flex', alignItems: 'center', gap: '16px',
          }}>
            <div style={{ fontSize: '32px' }}>📚</div>
            <div>
              <div style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 900,
                fontSize: '34px', color: '#f59e0b', lineHeight: 1,
              }}>
                {loading ? (
                  <span style={{ fontSize: '20px', opacity: 0.5 }}>Loading...</span>
                ) : (
                  <>{courseCount !== null ? courseCount : '50'}+</>
                )}
              </div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px', fontWeight: 500 }}>
                Free Courses Available
              </div>
            </div>
          </div>

          {[
            { emoji: '👨‍🎓', val: '10K+', label: 'Students', c: '#3b82f6', bg: 'rgba(59,130,246,0.08)', bd: 'rgba(59,130,246,0.18)' },
            { emoji: '⭐', val: '4.9/5', label: 'Rating', c: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', bd: 'rgba(139,92,246,0.18)' },
            { emoji: '🎯', val: '98%', label: 'Success Rate', c: '#10b981', bg: 'rgba(16,185,129,0.08)', bd: 'rgba(16,185,129,0.18)' },
            { emoji: '🏆', val: 'FREE', label: 'Always & Forever', c: '#ef4444', bg: 'rgba(239,68,68,0.08)', bd: 'rgba(239,68,68,0.18)' },
          ].map((s, i) => (
            <div key={i} style={{
              background: s.bg, border: `1px solid ${s.bd}`,
              borderRadius: '16px', padding: '16px 14px',
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.emoji}</div>
              <div style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: '22px', color: s.c,
              }}>{s.val}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Why Dark Universe */}
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700,
            fontSize: '17px', color: '#f1f5f9', marginBottom: '14px',
          }}>
            🌌 Why Dark Universe?
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '14px',
              }}>
                <div style={{
                  width: '46px', height: '46px', flexShrink: 0,
                  background: 'rgba(245,158,11,0.1)',
                  border: '1px solid rgba(245,158,11,0.15)',
                  borderRadius: '13px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px',
                }}>{f.icon}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#e2e8f0', marginBottom: '2px' }}>{f.title}</div>
                  <div style={{ fontSize: '12px', color: '#475569' }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary CTA */}
        <button
          onClick={() => router.push('/courses')}
          style={{
            width: '100%', padding: '16px',
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.22)',
            borderRadius: '16px',
            color: '#f59e0b', fontWeight: 700, fontSize: '15px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <span>📚</span> Browse All Courses →
        </button>
      </div>
    </div>
  );
};

export default HomePage;
