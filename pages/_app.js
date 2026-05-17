import '../styles/globals.css';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import WhatsAppPopup from '../src/components/WhatsAppPopup';
import BottomNav from '../src/components/BottomNav';
import AppDrawer from '../src/components/AppDrawer';

const NO_NAV_PAGES = ['/player', '/admin', '/aditya-ghoghari-admin', '/test-api'];

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [popupKey, setPopupKey] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const showNav = !NO_NAV_PAGES.some(p => router.pathname.startsWith(p));

  useEffect(() => {
    const onStart = () => { setTransitioning(true); setDrawerOpen(false); };
    const onComplete = () => {
      setTransitioning(false);
      setPopupKey(k => k + 1);
      window.scrollTo(0, 0);
    };
    router.events.on('routeChangeStart', onStart);
    router.events.on('routeChangeComplete', onComplete);
    return () => {
      router.events.off('routeChangeStart', onStart);
      router.events.off('routeChangeComplete', onComplete);
    };
  }, [router.events]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key)) || (e.ctrlKey && e.key === 'u')) {
        e.preventDefault(); return false;
      }
    };
    const handleCtx = (e) => { e.preventDefault(); return false; };
    document.addEventListener('keydown', handleKey, true);
    document.addEventListener('contextmenu', handleCtx, true);
    return () => {
      document.removeEventListener('keydown', handleKey, true);
      document.removeEventListener('contextmenu', handleCtx, true);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Dark Universe — Premium Learning</title>
        <meta name="description" content="India's #1 free premium learning platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#080c12" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {drawerOpen && (
        <div onClick={() => setDrawerOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 199,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
        }} />
      )}

      <AppDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div style={{
        paddingBottom: showNav ? 'calc(64px + env(safe-area-inset-bottom, 0px))' : 0,
        opacity: transitioning ? 0.6 : 1,
        transition: 'opacity 0.18s ease',
        minHeight: '100dvh',
      }}>
        <Component {...pageProps} onMenuClick={() => setDrawerOpen(true)} />
      </div>

      {showNav && <BottomNav />}
      <WhatsAppPopup key={popupKey} />
    </>
  );
}
