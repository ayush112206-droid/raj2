import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NAV_ITEMS = [
  { href: '/', label: 'Home', emoji: '🏠' },
  { href: '/courses', label: 'Courses', emoji: '📚' },
  { href: '/profile', label: 'Profile', emoji: '👤' },
];

const AppDrawer = ({ open, onClose }) => {
  const router = useRouter();

  return (
    <div style={{
      position: 'fixed',
      left: 0, top: 0, bottom: 0,
      width: '282px',
      zIndex: 200,
      background: 'linear-gradient(180deg, #0b0f1c 0%, #080c12 100%)',
      borderRight: '1px solid rgba(245,158,11,0.12)',
      transform: open ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: open ? '8px 0 48px rgba(0,0,0,0.8)' : 'none',
      paddingTop: 'env(safe-area-inset-top, 0px)',
    }}>
      {/* Brand header */}
      <div style={{
        padding: '28px 20px 22px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(245,158,11,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
          <div style={{
            width: '50px', height: '50px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '26px',
            boxShadow: '0 6px 20px rgba(245,158,11,0.45)',
            flexShrink: 0,
          }}>🌌</div>
          <div>
            <div style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 900,
              fontSize: '21px',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}>
              Dark Universe
            </div>
            <div style={{
              fontSize: '10.5px',
              color: '#475569',
              marginTop: '3px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}>
              Premium Learning
            </div>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <div style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        <div style={{
          fontSize: '10px', color: '#334155',
          fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.12em',
          padding: '4px 10px 12px',
        }}>
          Menu
        </div>

        {NAV_ITEMS.map(({ href, label, emoji }) => {
          const active = router.pathname === href;
          return (
            <Link key={href} href={href} onClick={onClose} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '13px 14px',
                borderRadius: '13px',
                marginBottom: '4px',
                background: active ? 'rgba(245,158,11,0.13)' : 'transparent',
                border: `1px solid ${active ? 'rgba(245,158,11,0.25)' : 'transparent'}`,
                transition: 'all 0.18s',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
              }}>
                <div style={{
                  width: '40px', height: '40px',
                  borderRadius: '11px',
                  background: active ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', flexShrink: 0,
                }}>
                  {emoji}
                </div>
                <span style={{
                  fontWeight: active ? 700 : 500,
                  fontSize: '15px',
                  color: active ? '#f59e0b' : '#94a3b8',
                  flex: 1,
                }}>
                  {label}
                </span>
                {active && (
                  <div style={{
                    width: '7px', height: '7px',
                    borderRadius: '50%',
                    background: '#f59e0b',
                    boxShadow: '0 0 10px #f59e0b',
                  }} />
                )}
              </div>
            </Link>
          );
        })}

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '14px 4px' }} />

        {/* Admin */}
        <Link href="/admin" onClick={onClose} style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            padding: '13px 14px', borderRadius: '13px',
            background: 'transparent', border: '1px solid transparent',
            cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '11px',
              background: 'rgba(255,255,255,0.04)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px',
            }}>⚙️</div>
            <span style={{ fontWeight: 500, fontSize: '15px', color: '#64748b' }}>Admin Panel</span>
          </div>
        </Link>
      </div>

      {/* Footer WA */}
      <div style={{
        padding: '14px 14px calc(14px + env(safe-area-inset-bottom, 0px))',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <a
          href="https://whatsapp.com/channel/0029Va9TLtJDp2132QkGU53z"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px 14px',
            background: 'rgba(37,211,102,0.08)',
            border: '1px solid rgba(37,211,102,0.2)',
            borderRadius: '13px',
            textDecoration: 'none',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <div style={{
            width: '38px', height: '38px', borderRadius: '11px',
            background: 'linear-gradient(135deg, #25d366, #128c7e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '19px', flexShrink: 0,
          }}>💬</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#25d366' }}>Join WhatsApp</div>
            <div style={{ fontSize: '11px', color: '#475569', marginTop: '1px' }}>Free updates & batches</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#25d366" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default AppDrawer;
