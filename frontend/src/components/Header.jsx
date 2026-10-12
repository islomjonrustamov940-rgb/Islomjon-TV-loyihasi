import React from 'react';

export default function Header({ onGoToHome }) {
  return (
    <div>
      {/* 1-Header: Tepadagi ingichka oq panel (Screenshot 4 dagi kabi) */}
      <div style={{
        backgroundColor: '#fff',
        padding: '8px 40px',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #eee'
      }}>
        <span style={{ fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }} onClick={onGoToHome}>
          Islomjon TV
        </span>
        
        {/* Tepadagi kichik profil avatar rasmi */}
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: '#222',
          cursor: 'pointer'
        }}>
          <img 
            src="https://via.placeholder.com/150" 
            alt="Profile" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      </div>

      {/* 2-Header: Dashboard ikkinchi paneli */}
      <header style={{
        backgroundColor: '#fff',
        padding: '15px 40px',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #e0e0e0',
        marginBottom: '20px'
      }}>
        <span style={{ fontSize: '15px', color: '#333', cursor: 'pointer' }} onClick={onGoToHome}>
          Islomjon TV
        </span>
        
        {/* Binafsha rangli yumaloq profil belgisi */}
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: '#6c5ce7',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          cursor: 'pointer',
          fontSize: '18px'
        }}>
          👤
        </div>
      </header>
    </div>
  );
}