import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TopBar from './TopBar';
import CourseCard from './CourseCard';
import { getCurrentApiUrl, getBatches } from '../services/apiService';

const CoursesPage = ({ onMenuClick }) => {
  const router = useRouter();
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => { loadBatches(); }, []);

  const loadBatches = async () => {
    setLoading(true); setError('');
    try {
      await getCurrentApiUrl();
      const res = await getBatches();
      const data = res.data || res || [];
      setBatches(Array.isArray(data) ? data : []);
      if (!Array.isArray(data) || data.length === 0) setError('No courses found.');
    } catch (e) {
      setError('Failed to load courses. Tap retry.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = batches.filter(b =>
    (b.course_name || b.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: '#080c12', minHeight: '100vh' }}>
      <TopBar title="Courses" onMenuClick={onMenuClick} />

      <div style={{ padding: '14px 14px 16px' }}>
        {/* Search bar */}
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          <div style={{
            position: 'absolute', left: '13px', top: '50%',
            transform: 'translateY(-50%)',
            color: '#475569', fontSize: '17px', pointerEvents: 'none',
          }}>🔍</div>
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '12px 14px 12px 42px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px', color: '#f1f5f9',
              fontSize: '14px', outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute', right: '12px', top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.08)', border: 'none',
                borderRadius: '50%', width: '22px', height: '22px',
                color: '#64748b', cursor: 'pointer', fontSize: '13px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >✕</button>
          )}
        </div>

        {/* Count badge */}
        {!loading && batches.length > 0 && (
          <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: '100px', padding: '4px 12px',
              fontSize: '12px', color: '#f59e0b', fontWeight: 700,
            }}>
              {filtered.length} courses
            </span>
            {search && (
              <span style={{ fontSize: '12px', color: '#475569' }}>
                for "{search}"
              </span>
            )}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
            gap: '12px',
          }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="shimmer" style={{ height: '220px', borderRadius: '16px' }} />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && batches.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 24px' }}>
            <div style={{ fontSize: '52px', marginBottom: '14px' }}>😔</div>
            <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '14px' }}>{error}</p>
            <button onClick={loadBatches} className="btn-gold" style={{ padding: '12px 28px', fontSize: '14px' }}>
              🔄 Try Again
            </button>
          </div>
        )}

        {/* No search results */}
        {!loading && !error && filtered.length === 0 && batches.length > 0 && (
          <div style={{ textAlign: 'center', padding: '60px 24px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
            <p style={{ color: '#64748b', fontSize: '14px' }}>No courses found for "{search}"</p>
            <button onClick={() => setSearch('')} style={{
              marginTop: '14px', padding: '10px 22px',
              background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: '10px', color: '#f59e0b', cursor: 'pointer', fontSize: '14px',
            }}>Clear Search</button>
          </div>
        )}

        {/* Course Grid */}
        {!loading && filtered.length > 0 && (
          <div
            className="stagger"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
              gap: '12px',
            }}
          >
            {filtered.map(batch => (
              <CourseCard
                key={batch.id}
                course={batch}
                onClick={() => router.push(`/batch/${batch.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
