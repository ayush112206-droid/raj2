import React, { useState, useEffect } from 'react';

const WHATSAPP_URL = 'https://whatsapp.com/channel/0029Va9TLtJDp2132QkGU53z';

// NO cooldown — shows fresh every time this component mounts (keyed by route in _app.js)
const WhatsAppPopup = () => {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // Show after 3 seconds — every single page, no session check
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => { setVisible(false); setClosing(false); }, 300);
  };

  const handleJoin = () => {
    window.open(WHATSAPP_URL, '_blank');
    handleClose();
  };

  if (!visible) return null;

  return (
    <div
      className={closing ? 'slide-out' : 'slide-in'}
      style={{
        position: 'fixed',
        bottom: 'calc(78px + env(safe-area-inset-bottom, 0px))',
        right: '14px',
        zIndex: 99999,
        maxWidth: '310px',
        width: 'calc(100vw - 28px)',
      }}
    >
      <div style={{
        background: 'linear-gradient(145deg, #0d1421 0%, #111827 100%)',
        border: '1px solid rgba(37,211,102,0.3)',
        borderRadius: '18px',
        padding: '16px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(37,211,102,0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Green glow top line */}
        <div style={{
          position: 'absolute', top: 0, left: '20%', right: '20%', height: '2px',
          background: 'linear-gradient(90deg, transparent, #25d366, transparent)',
          borderRadius: '0 0 4px 4px',
        }} />

        {/* Dark Universe label */}
        <div style={{
          position: 'absolute', top: '10px', left: '14px',
          fontSize: '9px', color: '#475569',
          fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          🌌 Dark Universe
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute', top: '10px', right: '10px',
            background: 'rgba(255,255,255,0.07)',
            border: 'none', borderRadius: '50%',
            width: '26px', height: '26px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#64748b', fontSize: '13px',
            WebkitTapHighlightColor: 'transparent',
          }}
        >✕</button>

        {/* Content */}
        <div style={{ marginTop: '22px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{
            width: '46px', height: '46px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #25d366, #128c7e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 6px 18px rgba(37,211,102,0.35)',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: '#f1f5f9', lineHeight: 1.2 }}>
              Join WhatsApp Channel
            </div>
            <div style={{ fontSize: '11px', color: '#25d366', marginTop: '3px', fontWeight: 600 }}>
              🔔 Free updates & new batches
            </div>
          </div>
        </div>

        <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '13px', lineHeight: 1.55, paddingLeft: '2px' }}>
          Latest free batches, website updates aur exclusive content ke liye abhi join karo! 🚀
        </p>

        <button
          onClick={handleJoin}
          style={{
            width: '100%', padding: '11px',
            background: 'linear-gradient(135deg, #25d366, #128c7e)',
            border: 'none', borderRadius: '12px',
            color: 'white', fontWeight: 700, fontSize: '14px',
            cursor: 'pointer', letterSpacing: '0.02em',
            WebkitTapHighlightColor: 'transparent',
            boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
          }}
        >
          Join Now →
        </button>
      </div>
    </div>
  );
};

export default WhatsAppPopup;
