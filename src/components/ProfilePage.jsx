import React, { useState, useEffect } from 'react';
import TopBar from './TopBar';

const ACHIEVEMENTS = [
  { icon: '🔥', title: 'Early Adopter', desc: 'Joined Dark Universe', unlocked: true },
  { icon: '🌌', title: 'Explorer', desc: 'Visited Courses page', unlocked: true },
  { icon: '⭐', title: 'Rising Star', desc: 'Complete 5 courses', unlocked: false },
  { icon: '🏆', title: 'Champion', desc: 'Complete 20 courses', unlocked: false },
];

const MENU_LINKS = [
  { icon: '💬', label: 'Join WhatsApp Channel', sub: 'Free updates & batches', href: 'https://whatsapp.com/channel/0029Va9TLtJDp2132QkGU53z', color: '#25d366' },
  { icon: '📚', label: 'Browse Courses', sub: 'All free courses', href: '/courses', color: '#f59e0b' },
  { icon: '⚙️', label: 'Admin Panel', sub: 'Manage platform', href: '/admin', color: '#64748b' },
];

const ProfilePage = ({ onMenuClick }) => {
  const [profile, setProfile] = useState({ name: '', emoji: '👤' });
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem('du_profile_v2');
    if (stored) {
      const p = JSON.parse(stored);
      setProfile(p);
      setTempName(p.name);
    } else {
      // First time - show editor
      setEditing(true);
    }
  }, []);

  const saveProfile = () => {
    const n = tempName.trim() || 'Dark Universe Student';
    const initials = n.charAt(0).toUpperCase();
    const newP = { name: n, initials };
    setProfile(newP);
    localStorage.setItem('du_profile_v2', JSON.stringify(newP));
    setEditing(false);
  };

  const joinDate = isMounted ? (() => {
    const k = 'du_join_date';
    const s = localStorage.getItem(k);
    if (s) return s;
    const d = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    localStorage.setItem(k, d);
    return d;
  })() : '—';

  const initials = profile.initials || profile.name?.charAt(0)?.toUpperCase() || '?';

  return (
    <div style={{ background: '#080c12', minHeight: '100vh' }}>
      <TopBar title="Profile" onMenuClick={onMenuClick} />

      <div style={{ padding: '24px 16px 32px' }}>
        {/* Avatar & Name Block */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '28px 20px 24px',
          background: 'linear-gradient(135deg, rgba(245,158,11,0.07) 0%, rgba(139,92,246,0.05) 100%)',
          border: '1px solid rgba(245,158,11,0.13)',
          borderRadius: '22px', marginBottom: '20px',
        }}>
          {/* Avatar */}
          <div style={{
            width: '90px', height: '90px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '38px', fontWeight: 900,
            color: '#000', fontFamily: 'Syne, sans-serif',
            boxShadow: '0 8px 32px rgba(245,158,11,0.45)',
            marginBottom: '14px',
            border: '3px solid rgba(245,158,11,0.3)',
          }}>
            {editing ? '✏️' : initials}
          </div>

          {editing ? (
            <div style={{ width: '100%', maxWidth: '260px' }}>
              <input
                type="text"
                value={tempName}
                onChange={e => setTempName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveProfile()}
                placeholder="Your name..."
                autoFocus
                style={{
                  width: '100%', textAlign: 'center', fontSize: '16px',
                  marginBottom: '12px', boxSizing: 'border-box',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(245,158,11,0.3)',
                  borderRadius: '12px', color: '#f1f5f9',
                  padding: '12px 14px',
                }}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={saveProfile}
                  className="btn-gold"
                  style={{ flex: 1, padding: '12px', fontSize: '14px' }}
                >
                  ✓ Save
                </button>
                {profile.name && (
                  <button onClick={() => setEditing(false)} style={{
                    padding: '12px 16px', fontSize: '14px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px', color: '#94a3b8', cursor: 'pointer',
                  }}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              <h2 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: '22px', color: '#f1f5f9', marginBottom: '5px', textAlign: 'center',
              }}>
                {profile.name || 'Dark Universe Student'}
              </h2>
              <p style={{ fontSize: '12px', color: '#475569', marginBottom: '14px' }}>
                Member since {joinDate}
              </p>
              <button onClick={() => { setTempName(profile.name); setEditing(true); }} style={{
                padding: '8px 20px', fontSize: '13px',
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.22)',
                borderRadius: '10px', color: '#f59e0b',
                cursor: 'pointer', fontWeight: 600,
                WebkitTapHighlightColor: 'transparent',
              }}>
                ✏️ Edit Name
              </button>
            </>
          )}
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '22px' }}>
          {[
            { val: '0', label: 'Courses\nViewed', icon: '📚' },
            { val: '0h', label: 'Hours\nStudied', icon: '⏱️' },
            { val: '0🔥', label: 'Day\nStreak', icon: '' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px', padding: '14px 8px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: '20px', color: '#f59e0b',
              }}>{s.val}</div>
              <div style={{
                fontSize: '11px', color: '#475569',
                marginTop: '4px', lineHeight: 1.35,
                whiteSpace: 'pre-line',
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <h3 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 700,
          fontSize: '16px', color: '#f1f5f9', marginBottom: '12px',
        }}>
          🏆 Achievements
        </h3>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px',
        }}>
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} style={{
              padding: '14px 12px',
              background: a.unlocked ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${a.unlocked ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.06)'}`,
              borderRadius: '16px',
              opacity: a.unlocked ? 1 : 0.55,
            }}>
              <div style={{ fontSize: '26px', marginBottom: '7px' }}>
                {a.unlocked ? a.icon : '🔒'}
              </div>
              <div style={{
                fontSize: '12.5px', fontWeight: 700,
                color: a.unlocked ? '#f1f5f9' : '#475569',
                marginBottom: '3px',
              }}>{a.title}</div>
              <div style={{ fontSize: '11px', color: '#475569', lineHeight: 1.35 }}>{a.desc}</div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <h3 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 700,
          fontSize: '16px', color: '#f1f5f9', marginBottom: '12px',
        }}>
          Quick Links
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
          {MENU_LINKS.map((l, i) => {
            const isExternal = l.href.startsWith('http');
            const Tag = isExternal ? 'a' : 'div';
            const extraProps = isExternal
              ? { href: l.href, target: '_blank', rel: 'noopener noreferrer' }
              : { onClick: () => typeof window !== 'undefined' && (window.location.href = l.href) };
            return (
              <Tag key={i} {...extraProps} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '14px 16px',
                background: `rgba(${l.color === '#25d366' ? '37,211,102' : l.color === '#f59e0b' ? '245,158,11' : '100,116,139'},0.07)`,
                border: `1px solid ${l.color === '#25d366' ? 'rgba(37,211,102,0.18)' : l.color === '#f59e0b' ? 'rgba(245,158,11,0.18)' : 'rgba(100,116,139,0.18)'}`,
                borderRadius: '16px',
                textDecoration: 'none',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: `${l.color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', flexShrink: 0,
                }}>{l.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: l.color }}>{l.label}</div>
                  <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>{l.sub}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={l.color} strokeWidth="2.5" opacity="0.7">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </Tag>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', color: '#1e293b', fontSize: '12px', paddingTop: '8px' }}>
          🌌 Dark Universe v2.0 · Premium Free Education
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
