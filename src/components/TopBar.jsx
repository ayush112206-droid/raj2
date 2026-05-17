import React from 'react';
import { useRouter } from 'next/router';

const TopBar = ({ title = 'Dark Universe', onMenuClick, showBack = false, rightAction = null }) => {
  const router = useRouter();

  return (
    <div style={{
      position: 'sticky',
      top: 0, zIndex: 50,
      background: 'rgba(8,12,18,0.97)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '4px',
      paddingRight: '4px',
      paddingTop: 'env(safe-area-inset-top, 0px)',
      gap: '0',
    }}>
      {/* Left button */}
      <button
        onClick={showBack ? () => router.back() : onMenuClick}
        style={{
          width: '48px', height: '48px',
          background: 'none', border: 'none',
          borderRadius: '50%', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#cbd5e1', flexShrink: 0,
          WebkitTapHighlightColor: 'transparent',
          transition: 'background 0.15s',
        }}
      >
        {showBack ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="15" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        )}
      </button>

      {/* Title */}
      <div style={{
        flex: 1,
        textAlign: showBack ? 'left' : 'center',
        paddingLeft: showBack ? '2px' : '0',
        paddingRight: showBack ? '0' : '48px',
      }}>
        <span style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: showBack ? '17px' : '18px',
          background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.01em',
        }}>
          {title}
        </span>
      </div>

      {/* Right action */}
      {rightAction && (
        <div style={{ width: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {rightAction}
        </div>
      )}
    </div>
  );
};

export default TopBar;
