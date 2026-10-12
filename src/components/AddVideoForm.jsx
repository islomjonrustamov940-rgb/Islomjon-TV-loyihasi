import React, { useState } from 'react';

export default function AddVideoForm({ onAddVideo }) {
  const [title, setTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [category, setCategory] = useState('Kino');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddVideo({
      id: Date.now(),
      title,
      youtubeUrl,
      category,
      rating: Number(rating)
    });

    setTitle('');
    setYoutubeUrl('');
  };

  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '25px' }}>
      <h4 style={{ margin: '0 0 15px 0' }}>Yangi element qo'shish</h4>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Video yoki element nomi..." 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 2, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            required
          />
          <input 
            type="text" 
            placeholder="YouTube link (masalan: https://www.youtube.com/watch?v=...)" 
            value={youtubeUrl} 
            onChange={(e) => setYoutubeUrl(e.target.value)}
            style={{ flex: 2, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
          >
            <option value="Kino">Kino</option>
            <option value="Multfilm">Multfilm</option>
            <option value="Darslar">Darslar</option>
          </select>

          <select 
            value={rating} 
            onChange={(e) => setRating(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
          >
            <option value={5}>5 ★ Reyting</option>
            <option value={4}>4 ★ Reyting</option>
            <option value={3}>3 ★ Reyting</option>
            <option value={2}>2 ★ Reyting</option>
            <option value={1}>1 ★ Reyting</option>
          </select>

          <button 
            type="submit" 
            style={{ backgroundColor: '#0066ff', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Qo'shish
          </button>
        </div>
      </form>
    </div>
  );
}