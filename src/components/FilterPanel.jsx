import React from 'react';

export default function FilterPanel({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedRating, 
  setSelectedRating, 
  sortOrder, 
  setSortOrder 
}) {
  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '25px' }}>
      <h4 style={{ margin: '0 0 15px 0' }}>Filtr va Saralash (Vazifa qismi)</h4>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        
        {/* Kategoriya dropdown */}
        <div>
          <label style={{ fontSize: '13px', color: '#555', display: 'block', marginBottom: '5px' }}>Kategoriya:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="Barchasi">Barchasi</option>
            <option value="Darslar">Darslar</option>
            <option value="Kino">Kino</option>
            <option value="Multfilm">Multfilm</option>
          </select>
        </div>

        {/* Yulduzchali filter */}
        <div>
          <label style={{ fontSize: '13px', color: '#555', display: 'block', marginBottom: '5px' }}>Reyting (Yulduzlar):</label>
          <div style={{ display: 'flex', gap: '5px' }}>
            {[0, 3, 4, 5].map(star => (
              <button 
                key={star} 
                onClick={() => setSelectedRating(star)} 
                style={{ 
                  padding: '6px 12px', 
                  borderRadius: '5px', 
                  border: '1px solid #ccc', 
                  backgroundColor: selectedRating === star ? '#ffd700' : '#fff', 
                  fontWeight: selectedRating === star ? 'bold' : 'normal',
                  cursor: 'pointer' 
                }}
              >
                {star === 0 ? 'Barchasi' : `${star} ★`}
              </button>
            ))}
          </div>
        </div>

        {/* Saralash (Sort) */}
        <div>
          <label style={{ fontSize: '13px', color: '#555', display: 'block', marginBottom: '5px' }}>Saralash:</label>
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="default">Standart</option>
            <option value="asc">Reyting: Pastdan yuqoriga</option>
            <option value="desc">Reyting: Yuqoridan pastga</option>
          </select>
        </div>

      </div>
    </div>
  );
}