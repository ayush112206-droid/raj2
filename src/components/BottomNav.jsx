import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const HomeIcon = ({ active }) => (
  <svg width="23" height="23" viewBox="0 0 24 24" fill={active ? '#f59e0b' : 'none'} stroke={active ? '#f59e0b' : '#475569'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

const CoursesIcon = ({ active }) => (
  <svg width="23" height="23" viewBox="0 0 24 24" fill={active ? '#f59e0b' : 'none'} stroke={active ? '#f59e0b' : '#475569'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
  </svg>
);

const ProfileIcon = ({ active }) => (
  <svg width="23" height="23" viewBox="0 0 24 24" fill={active ? '#f59e0b' : 'none'} stroke={active ? '#f59e0b' : '#475569'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const TABS = [
  { href: '/', label: 'Home', Icon: HomeIcon },
  { href: '/courses', label: 'Courses', Icon: CoursesIcon },
  { href: '/profile', label: 'Profile', Icon: ProfileIcon },
];

const BottomNav = () => {
  const router = useRouter();

  return (
    <div style={{
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      zIndex: 100,
      background: 'rgba(8,12,18,0.98)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      display: 'flex',
      alignItems: 'stretch',
    }}>
      {TABS.map(({ href, label, Icon }) => {
        const active = router.pathname === href;
        return (
          <Link key={href} href={href} style={{
            flex: 1, textDecoration: 'none',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '10px 4px 8px',
            position: 'relative',
            WebkitTapHighlightColor: 'transparent',
            userSelect: 'none',
          }}>
            {/* Top active bar */}
            <div style={{
              position: 'absolute',
              top: 0, left: '50%',
              transform: 'translateX(-50%)',
              height: '2.5px',
              width: active ? '36px' : '0px',
              background: 'linear-gradient(90deg, #f59e0b, #d97706)',
              borderRadius: '0 0 4px 4px',
              boxShadow: active ? '0 0 10px rgba(245,158,11,0.7)' : 'none',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            }} />

            {/* Icon container */}
            <div style={{
              width: '44px', height: '38px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '14px',
              background: active ? 'rgba(245,158,11,0.1)' : 'transparent',
              transition: 'all 0.22s',
              transform: active ? 'translateY(-1px)' : 'translateY(0)',
              marginBottom: '2px',
            }}>
              <Icon active={active} />
            </div>

            {/* Label */}
            <span style={{
              fontSize: '10.5px',
              fontWeight: active ? 700 : 500,
              color: active ? '#f59e0b' : '#475569',
              letterSpacing: '0.01em',
              transition: 'all 0.2s',
            }}>
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNav;
