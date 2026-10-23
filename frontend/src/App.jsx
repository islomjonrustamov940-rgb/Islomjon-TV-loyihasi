import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

// YouTube URL dan ID olish va thumbnail yaratish
const getYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getYouTubeEmbedUrl = (url) => {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : url;
};

const getYouTubeThumbnail = (url) => {
  const id = getYouTubeId(url);
  return id 
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` 
    : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600';
};

const fetchVideos = async () => {
  return [
    { 
      id: 1, 
      title: 'Interstellar (Interstellar)', 
      category: 'Kino', 
      rating: 5, 
      duration: '2:49:00',
      language: "O'zbek Tilida [1080p/HD]",
      youtubeUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E' 
    },
    { 
      id: 2, 
      title: 'Inception (Muqaddima)', 
      category: 'Kino', 
      rating: 5, 
      duration: '2:28:00',
      language: "O'zbek Tilida [720p/HD]",
      youtubeUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0' 
    },
    { 
      id: 3, 
      title: 'Kung Fu Panda 4', 
      category: 'Multfilm', 
      rating: 5, 
      duration: '1:34:00',
      language: "O'zbek Tilida [1080p/HD]",
      youtubeUrl: 'https://www.youtube.com/watch?v=_inKs4eeHiI' 
    }
  ];
};

function MovieDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [userImage, setUserImage] = useState('https://i.pravatar.cc/150?img=12');

  const [activeVideoItem, setActiveVideoItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const { data: serverItems = [], isLoading, error } = useQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos,
  });

  const [localItems, setLocalItems] = useState([]);
  const [deletedIds, setDeletedIds] = useState([]);

  // Form state'lari
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('Kino');
  const [rating, setRating] = useState('5');
  const [duration, setDuration] = useState('1:45:00');

  if (isLoading) return <div style={{ padding: '40px', textAlign: 'center', color: '#fff' }}>Yuklanmoqda...</div>;
  if (error) return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>Xatolik yuz berdi!</div>;

  const allItems = [...serverItems, ...localItems].filter(item => !deletedIds.includes(item.id));

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem = {
      id: Date.now(),
      title: title,
      category: category,
      rating: Number(rating),
      duration: duration || '1:30:00',
      language: "O'zbek Tilida [HD]",
      youtubeUrl: videoUrl || 'https://www.youtube.com/watch?v=zSWdZVtXT7E'
    };

    setLocalItems([newItem, ...localItems]);
    setTitle('');
    setVideoUrl('');
  };

  const confirmDelete = () => {
    if (deleteId) {
      setDeletedIds([...deletedIds, deleteId]);
      setDeleteId(null);
    }
  };

  const handleEdit = (item) => {
    const newName = prompt("Yangi nomni kiriting:", item.title);
    if (newName) {
      setLocalItems(localItems.map(i => i.id === item.id ? { ...i, title: newName } : i));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserImage(imageUrl);
    }
  };

  const handleChangeImageByUrl = () => {
    const newUrl = prompt("Rasm havolasini (URL) kiriting:", userImage);
    if (newUrl) {
      setUserImage(newUrl);
    }
  };

  // 1. TIZIMGA KIRGAN HOLATI (DASHBOARD)
  if (isLoggedIn) {
    return (
      <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
        
        {/* Header (Profil va Chiqish bilan) */}
        <header style={{
          backgroundColor: '#1e293b',
          padding: '12px 40px',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #334155',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#38bdf8' }}>
            Islomjon TV 🎬
          </h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: 'auto' }}>
            <button 
              onClick={() => setIsLoggedIn(false)}
              style={{
                backgroundColor: '#ffe3e3',
                color: '#d6336c',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600'
              }}
            >
              Chiqish
            </button>

            {/* Profil rasmi */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <label htmlFor="profile-upload" style={{ cursor: 'pointer', display: 'block' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #38bdf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#38bdf8'
                }}>
                  <img 
                    src={userImage} 
                    alt="Profile" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              </label>

              <input 
                id="profile-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                style={{ display: 'none' }} 
              />
            </div>
            
            <button 
              onClick={handleChangeImageByUrl} 
              style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
            >
              URL bilan rasm
            </button>
          </div>
        </header>

        <div style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 20px' }}>
          
          {/* Yangi Kino Qo'shish Formasi */}
          <div style={{ background: '#1e293b', padding: '24px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '30px' }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#f8fafc' }}>
              ➕ Yangi Kino yoki Multfilm Qo'shish
            </h4>
            
            <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input 
                  type="text" 
                  placeholder="Kino nomi..." 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ flex: 2, minWidth: '200px', padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff' }}
                />
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ flex: 1, minWidth: '120px', padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff' }}
                >
                  <option value="Kino">Kino</option>
                  <option value="Multfilm">Multfilm</option>
                  <option value="Darslar">Darslar</option>
                </select>
                <select 
                  value={rating} 
                  onChange={(e) => setRating(e.target.value)}
                  style={{ flex: 1, minWidth: '100px', padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff' }}
                >
                  <option value="5">5 ★★★★★</option>
                  <option value="4">4 ★★★★☆</option>
                  <option value="3">3 ★★★☆☆</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input 
                  type="text" 
                  placeholder="YouTube Link (masalan: https://www.youtube.com/watch?v=...)" 
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  style={{ flex: 2, minWidth: '200px', padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff' }}
                />
                <input 
                  type="text" 
                  placeholder="Davomiyligi (1:45:00)" 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  style={{ flex: 1, minWidth: '140px', padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff' }}
                />
                <button 
                  type="submit"
                  style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>

          <h3 style={{ marginBottom: '20px', fontSize: '22px' }}>KINOLAR VA MULTFILMLAR 🎥</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {allItems.map(item => {
              const thumbnail = getYouTubeThumbnail(item.youtubeUrl);
              return (
                <div key={item.id} style={{
                  background: '#1e293b', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155', display: 'flex', flexDirection: 'column'
                }}>
                  <div style={{ position: 'relative', height: '180px', background: '#000' }}>
                    <img 
                      src={thumbnail} 
                      alt={item.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div 
                      onClick={() => setActiveVideoItem(item)}
                      style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                      }}
                    >
                      <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(229, 9, 20, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px' }}>
                        ▶
                      </div>
                    </div>
                  </div>

                  {/* Faqat 5 ta ma'lumot */}
                  <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>
                        🎬 {item.title}
                      </div>
                      <div>🇺🇿 <strong>Tili:</strong> {item.language || "O'zbek Tilida [HD]"}</div>
                      <div style={{ color: '#f59e0b' }}>
                        ⭐ <strong>Reyting:</strong> {'★'.repeat(item.rating)}
                      </div>
                      <div>⚔️ <strong>Janri:</strong> <span style={{ color: '#38bdf8' }}>{item.category}</span></div>
                      <div>⌛ <strong>Davomiyligi:</strong> {item.duration || '1:40:00'}</div>
                    </div>

                    <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => setActiveVideoItem(item)}
                        style={{ flex: 2, backgroundColor: '#e50914', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                      >
                        ▶ Tomosha qilish
                      </button>
                      <button 
                        onClick={() => handleEdit(item)}
                        style={{ flex: 1, backgroundColor: '#334155', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => setDeleteId(item.id)}
                        style={{ flex: 1, backgroundColor: '#7f1d1d', color: '#fca5a5', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
                      >
                        O'chirish
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Modal Video Pleyer */}
        {activeVideoItem && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px'
          }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '750px', background: '#1e293b', borderRadius: '12px', overflow: 'hidden', border: '1px solid #475569' }}>
              <button 
                onClick={() => setActiveVideoItem(null)}
                style={{
                  position: 'absolute', top: '10px', right: '15px', backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff',
                  border: 'none', fontSize: '18px', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', zIndex: 1001
                }}
              >
                ✕
              </button>
              
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: '#000' }}>
                <iframe
                  src={getYouTubeEmbedUrl(activeVideoItem.youtubeUrl)}
                  title={activeVideoItem.title}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Modal ichida ham 5 ta ma'lumot */}
              <div style={{ padding: '20px', color: '#f8fafc', lineHeight: '1.8' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', color: '#38bdf8' }}>🎬 {activeVideoItem.title}</h3>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>🇺🇿 <strong>Tili:</strong> {activeVideoItem.language || "O'zbek Tilida [HD]"}</p>
                <p style={{ margin: '4px 0', fontSize: '14px', color: '#f59e0b' }}>⭐ <strong>Reyting:</strong> {'★'.repeat(activeVideoItem.rating)}</p>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>⚔️ <strong>Janri:</strong> {activeVideoItem.category}</p>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>⌛ <strong>Davomiyligi:</strong> {activeVideoItem.duration || '1:40:00'}</p>
              </div>
            </div>
          </div>
        )}

        {/* O'chirishni tasdiqlash uchun Modal (Ha / Yo'q) */}
        {deleteId && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100
          }}>
            <div style={{
              background: '#1e293b', padding: '25px', borderRadius: '12px', width: '320px', textAlign: 'center', border: '1px solid #475569', color: '#fff'
            }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Rostdan ham o'chirmoqchimisiz?</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>Ushbu film ro'yxatdan o'chiriladi.</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button 
                  onClick={confirmDelete}
                  style={{ flex: 1, backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Ha
                </button>
                <button 
                  onClick={() => setDeleteId(null)}
                  style={{ flex: 1, backgroundColor: '#475569', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
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

  // 2. LANDING PAGE / RO'YXATDAN O'TISH SAHIFASI
  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1200")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#e50914' }}>Islomjon TV</h2>
        <div>
          <button onClick={() => setAuthMode('login')} style={{ background: 'transparent', color: '#fff', border: 'none', marginRight: '20px', cursor: 'pointer', fontSize: '15px' }}>
            Kirish
          </button>
          <button onClick={() => setAuthMode('register')} style={{ background: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '15px' }}>
            Ro'yxatdan o'tish
          </button>
        </div>
      </nav>

      <div style={{ textAlign: 'center', marginTop: '60px', padding: '0 20px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '15px', fontWeight: 'bold' }}>Islomjon TV 🎬</h1>
        <p style={{ fontSize: '20px', color: '#e0e0e0', maxWidth: '700px', margin: '0 auto 10px' }}>
          Cheksiz filmlar, premyeralar va seriallar olamiga xush kelibsiz!
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', margin: '30px 0 40px' }}>
          <button onClick={() => setIsLoggedIn(true)} style={{ padding: '12px 28px', backgroundColor: '#e50914', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            ▶ Bepul Tomosha Qilish
          </button>
          <button onClick={() => setIsLoggedIn(true)} style={{ padding: '12px 28px', backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '6px', fontSize: '16px', cursor: 'pointer' }}>
            🔑 Hisobga Kirish
          </button>
        </div>

        {/* Ro'yxatdan o'tish va Kirish formasi */}
        <div style={{ maxWidth: '380px', margin: '0 auto', background: 'rgba(15, 23, 42, 0.95)', padding: '30px', borderRadius: '12px', border: '1px solid #334155' }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '20px' }}>
            {authMode === 'login' ? 'Hisobga Kirish' : "Ro'yxatdan o'tish"}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input type="email" placeholder="Email yoki telefon..." style={{ padding: '12px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', outline: 'none' }} />
            <input type="password" placeholder="Parol..." style={{ padding: '12px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', outline: 'none' }} />
            <button onClick={() => setIsLoggedIn(true)} style={{ padding: '12px', backgroundColor: '#e50914', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', marginTop: '5px' }}>
              {authMode === 'login' ? 'Kirish' : "Ro'yxatdan o'tish"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MovieDashboard />
    </QueryClientProvider>
  );
}