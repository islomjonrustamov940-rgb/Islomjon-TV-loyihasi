import React from 'react';

export default function HomePage({ onStart }) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url("https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1200")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#fff',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 50px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Islomjon TV</h2>
        <div>
          <a href="#login" style={{ color: '#fff', marginRight: '20px', textDecoration: 'none' }}>Kirish</a>
          <a href="#register" style={{ color: '#fff', textDecoration: 'none' }}>Ro'yxatdan o'tish</a>
        </div>
      </nav>

      {/* Hero Content */}
      <div style={{ textAlign: 'center', marginTop: '120px', padding: '0 20px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '15px' }}>Islomjon TV 🎬</h1>
        <p style={{ fontSize: '20px', color: '#e0e0e0', maxWidth: '700px', margin: '0 auto 10px' }}>
          Cheksiz filmlar, premyeralar va seriallar olamiga xush kelibsiz!
        </p>
        <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '30px' }}>
          Gollivud, Turkiya va Milliy kinosanoatining eng sara asarlarini yuqori HD/4K sifatda tomosha qiling.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button 
            onClick={onStart} 
            style={{ padding: '12px 25px', backgroundColor: '#e50914', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            ▶ Bepul Tomosha Qilish
          </button>
          <button style={{ padding: '12px 25px', backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid #fff', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>
            🔑 Hisobga Kirish
          </button>
        </div>
      </div>
    </div>
  );
}