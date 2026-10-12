import React, { useState } from 'react';
import Header from "../components/Header";
import { initialVideosData } from '../data/videosData';

export default function Dashboard({ onGoToHome }) {
  const [items, setItems] = useState(initialVideosData);
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortOrder, setSortOrder] = useState('default');

  // Qo'shish
  const handleAdd = () => {
    if (!title.trim()) return;
    const newItem = {
      id: Date.now(),
      title: title,
      category: 'Darslar',
      rating: 5,
      youtubeUrl: ''
    };
    setItems([newItem, ...items]);
    setTitle('');
  };

  // O'chirish
  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Tahrirlash
  const handleEdit = (item) => {
    const newName = prompt("Yangi nomni kiriting:", item.title);
    if (newName) {
      setItems(items.map(i => i.id === item.id ? { ...i, title: newName } : i));
    }
  };

  // Filtr Mantiqi
  const filteredItems = items.filter(item => {
    const matchCat = selectedCategory === 'Barchasi' || item.category === selectedCategory;
    const matchRat = selectedRating === 0 || item.rating === selectedRating;
    return matchCat && matchRat;
  });

  // Sort Mantiqi
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === 'asc') return a.rating - b.rating;
    if (sortOrder === 'desc') return b.rating - a.rating;
    return 0;
  });

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Header onGoToHome={onGoToHome} />

      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px 40px' }}>
        <h2 style={{ margin: '0 0 5px 0', fontSize: '22px' }}>Salom, foydalanuvchi!</h2>
        <p style={{ color: '#666', marginTop: 0, marginBottom: '25px', fontSize: '14px' }}>
          Dashboard'dagi elementlarni boshqarish
        </p>

        {/* 1. Yangi element qo'shish */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', marginBottom: '25px' }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '15px' }}>Yangi element qo'shish</h4>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="Nomi..." 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ flex: 1, padding: '10px 14px', borderRadius: '6px', border: '1px solid #e0e0e0', outline: 'none' }}
            />
            <button 
              onClick={handleAdd}
              style={{ backgroundColor: '#0066ff', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Qo'shish
            </button>
          </div>
        </div>

        {/* 2. Filtr va Saralash (UYGA VAZIFA) */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', marginBottom: '25px' }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '15px' }}>Filtr va Saralash (Vazifa qismi)</h4>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            
            {/* Kategoriya dropdown */}
            <div>
              <label style={{ fontSize: '13px', color: '#555', display: 'block', marginBottom: '5px' }}>Kategoriya:</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
              >
                <option value="Barchasi">Barchasi</option>
                <option value="Darslar">Darslar</option>
                <option value="Kino">Kino</option>
                <option value="Multfilm">Multfilm</option>
              </select>
            </div>

            {/* Yulduzcha knopkalari */}
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
                style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
              >
                <option value="default">Standart</option>
                <option value="asc">Reyting: Pastdan yuqoriga</option>
                <option value="desc">Reyting: Yuqoridan pastga</option>
              </select>
            </div>

          </div>
        </div>

        {/* 3. Elementlar ro'yxati (Eski dizayn saqlangan) */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '15px' }}>Elementlar ro'yxati</h4>
          {sortedItems.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <div>
                <span style={{ fontWeight: '500', fontSize: '14px' }}>{item.title}</span>
                <span style={{ fontSize: '12px', color: '#999', marginLeft: '8px' }}>({item.category})</span>
                <span style={{ fontSize: '12px', color: '#f39c12', marginLeft: '8px' }}>{'★'.repeat(item.rating)}</span>
              </div>
              
              {/* Tahrirlash va O'chirish knopkalari (Eski ranglari bilan) */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => handleEdit(item)} 
                  style={{ backgroundColor: '#fff3bf', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                >
                  Tahrirlash
                </button>
                <button 
                  onClick={() => handleDelete(item.id)} 
                  style={{ backgroundColor: '#ffe3e3', color: '#d6336c', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                >
                  O'chirish
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}