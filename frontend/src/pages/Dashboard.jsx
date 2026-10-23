import React, { useState } from 'react';
import Header from "../components/Header";
import { useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const fetchVideos = async () => {
  return [
    { id: 1, title: "Interstellar", category: "Kino", rating: 5, imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500" },
    { id: 2, title: "Inception", category: "Kino", rating: 5, imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500" },
    { id: 3, title: "Kung Fu Panda 4", category: "Multfilm", rating: 4, imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500" },
  ];
};

export default function Dashboard({ onGoToHome }) {
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [sortOrder, setSortOrder] = useState('default');
  const [deleteId, setDeleteId] = useState(null);

  const { data: serverItems = [], isLoading, error } = useQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos,
  });

  const [localItems, setLocalItems] = useState([]);
  const [deletedIds, setDeletedIds] = useState([]);

  if (isLoading) return <div style={{ padding: '20px' }}>Yuklanmoqda...</div>;
  if (error) return <div style={{ padding: '20px' }}>Xatolik yuz berdi!</div>;

  const allItems = [...serverItems, ...localItems].filter(item => !deletedIds.includes(item.id));

  const handleAdd = () => {
    if (!title.trim()) return;
    const newItem = {
      id: Date.now(),
      title: title,
      category: 'Darslar',
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500"
    };
    setLocalItems([newItem, ...localItems]);
    setTitle('');
  };

  const confirmDelete = () => {
    if (deleteId) {
      setDeletedIds([...deletedIds, deleteId]);
      setDeleteId(null);
    }
  };

  const filteredItems = allItems.filter(item => {
    return selectedCategory === 'Barchasi' || item.category === selectedCategory;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === 'asc') return a.rating - b.rating;
    if (sortOrder === 'desc') return b.rating - a.rating;
    return 0;
  });

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Header onGoToHome={onGoToHome} />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px 40px' }}>
        <h2 style={{ margin: '0 0 5px 0', fontSize: '22px' }}>Salom, Islomjon!</h2>
        <p style={{ color: '#666', marginTop: 0, marginBottom: '25px', fontSize: '14px' }}>
          Kinolar va multfilmlar bazasini boshqarish paneli
        </p>

        <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', marginBottom: '25px' }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '15px' }}>Yangi Kino yoki Multfilm Qo'shish</h4>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="Kino / Multfilm nomi..." 
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

        <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', marginBottom: '25px' }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '15px' }}>Filtr va Saralash</h4>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {sortedItems.map(item => (
            <div key={item.id} style={{
              background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column'
            }}>
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                style={{ width: '100%', height: '160px', objectFit: 'cover' }}
              />
              <div style={{ padding: '15px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{item.title}</h3>
                  <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '13px' }}>
                    <strong>Janri:</strong> {item.category}
                  </p>
                  <p style={{ margin: '0 0 15px 0', color: '#f39c12', fontSize: '14px' }}>
                    {'★'.repeat(item.rating || 5)}
                  </p>
                </div>
                <button 
                  onClick={() => setDeleteId(item.id)} 
                  style={{ width: '100%', backgroundColor: '#ffe3e3', color: '#d6336c', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
                >
                  O'chirish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {deleteId && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            background: '#fff', padding: '25px', borderRadius: '12px', width: '320px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>O'chirishni tasdiqlaysizmi?</h3>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>Ushbu film ro'yxatdan o'chiriladi.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                onClick={confirmDelete}
                style={{ flex: 1, backgroundColor: '#fa5252', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Ha
              </button>
              <button 
                onClick={() => setDeleteId(null)}
                style={{ flex: 1, backgroundColor: '#e9ecef', color: '#495057', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Yo'q
              </button>
            </div>
          </div>
        </div>
      )}

      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}