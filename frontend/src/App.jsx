import React, { useState } from 'react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [authMode, setAuthMode] = useState('login');
  
  // Profil rasmi uchun state
  const [userImage, setUserImage] = useState('https://i.pravatar.cc/150?img=12');

  // Video pleyer uchun modal oynasi state'i
  const [activeVideo, setActiveVideo] = useState(null);

  // 3 ta top kino va 2 ta mashhur multfilm dastlabki ro'yxati
  const [items, setItems] = useState([
    { 
      id: 1, 
      title: 'Interstellar (Interstellar)', 
      category: 'Kino', 
      rating: 5, 
      channel: 'Hollywood Kino',
      youtubeUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E' 
    },
    { 
      id: 2, 
      title: 'Inception (Muqaddima)', 
      category: 'Kino', 
      rating: 5, 
      channel: 'Cinema HD',
      youtubeUrl: 'https://www.youtube.com/embed/YoHD9XEInc0' 
    },
    { 
      id: 3, 
      title: 'Avatar: The Way of Water', 
      category: 'Kino', 
      rating: 4, 
      channel: 'Premyera TV',
      youtubeUrl: 'https://www.youtube.com/embed/d9MyW72ELq0' 
    },
    { 
      id: 4, 
      title: 'Kung Fu Panda 4', 
      category: 'Multfilm', 
      rating: 5, 
      channel: 'Animation World',
      youtubeUrl: 'https://www.youtube.com/embed/isBCdwdjIO4' 
    },
    { 
      id: 5, 
      title: 'Frozen II (Sehrli Muz 2)', 
      category: 'Multfilm', 
      rating: 5, 
      channel: 'Disney Uz',
      youtubeUrl: 'https://www.youtube.com/embed/Zi4LMuGBll4' 
    }
  ]);

  // Yangi qo'shish uchun form state'lari
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [channel, setChannel] = useState('');
  const [category, setCategory] = useState('Kino');
  const [rating, setRating] = useState('5');

  // Yangi element (kino/multfilm) qo'shish
  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    // YouTube havolasini embed formatiga o'tkazish
    let embedUrl = videoUrl;
    if (videoUrl.includes('watch?v=')) {
      embedUrl = videoUrl.replace('watch?v=', 'embed/');
    } else if (videoUrl.includes('youtu.be/')) {
      embedUrl = videoUrl.replace('youtu.be/', 'youtube.com/embed/');
    }

    const newItem = {
      id: Date.now(),
      title: title,
      category: category,
      rating: Number(rating),
      channel: channel || 'Noma\'lum kanal',
      youtubeUrl: embedUrl || 'https://www.youtube.com/embed/zSWdZVtXT7E'
    };

    setItems([newItem, ...items]);
    setTitle('');
    setVideoUrl('');
    setChannel('');
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleEdit = (item) => {
    const newName = prompt("Yangi nomni kiriting:", item.title);
    if (newName) {
      setItems(items.map(i => i.id === item.id ? { ...i, title: newName } : i));
    }
  };

  // Profil rasmini kompyuterdan yuklash
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserImage(imageUrl);
    }
  };

  // Profil rasmini URL orqali almashtirish
  const handleChangeImageByUrl = () => {
    const newUrl = prompt("Rasm havolasini (URL) kiriting:", userImage);
    if (newUrl) {
      setUserImage(newUrl);
    }
  };

  // 1. TIZIMGA KIRGAN HOLATI (DASHBOARD)
  if (isLoggedIn) {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        
        {/* Tepadagi Header */}
        <header style={{
          backgroundColor: '#fff',
          padding: '12px 40px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #eaeaea',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Chap tomonda Logotip */}
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#111' }}>
            Islomjon TV
          </h3>
          
          {/* O'ng burchakdagi elementlar (marginLeft: 'auto' orqali to'liq o'ngga surilgan) */}
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
                fontWeight: '500'
              }}
            >
              Chiqish
            </button>

            {/* Profil rasmi */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <label htmlFor="profile-upload" style={{ cursor: 'pointer', display: 'block' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #6c5ce7',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  backgroundColor: '#6c5ce7'
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
              style={{ background: 'none', border: 'none', color: '#6c5ce7', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
            >
              URL bilan rasm qo'yish
            </button>

          </div>
        </header>

        {/* Asosiy Content */}
        <div style={{ maxWidth: '900px', margin: '35px auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#111' }}>
            Salom, Islomjon!
          </h2>
          <p style={{ color: '#6c757d', margin: '0 0 25px 0', fontSize: '14px' }}>
            Kinolar va multfilmlar bazasini boshqarish paneli
          </p>

          {/* Yangi Video Qo'shish Formasi */}
          <div style={{ 
            background: '#fff', 
            padding: '24px', 
            borderRadius: '12px', 
            border: '1px solid #e9ecef',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)', 
            marginBottom: '25px' 
          }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#212529', fontWeight: '600' }}>
              Yangi Kino yoki Multfilm Qo'shish
            </h4>
            
            <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input 
                  type="text" 
                  placeholder="Kino / Multfilm nomi..." 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ flex: 2, minWidth: '220px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ced4da', outline: 'none', fontSize: '14px' }}
                />
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ flex: 1, minWidth: '120px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ced4da', outline: 'none', fontSize: '14px', background: '#fff' }}
                >
                  <option value="Kino">Kino</option>
                  <option value="Multfilm">Multfilm</option>
                  <option value="Darslar">Darslar</option>
                </select>
                <select 
                  value={rating} 
                  onChange={(e) => setRating(e.target.value)}
                  style={{ flex: 1, minWidth: '100px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ced4da', outline: 'none', fontSize: '14px', background: '#fff' }}
                >
                  <option value="5">5 ★★★★★</option>
                  <option value="4">4 ★★★★☆</option>
                  <option value="3">3 ★★★☆☆</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input 
                  type="text" 
                  placeholder="YouTube Video Link (masalan: https://youtube.com/...)" 
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  style={{ flex: 2, minWidth: '220px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ced4da', outline: 'none', fontSize: '14px' }}
                />
                <input 
                  type="text" 
                  placeholder="Kanal nomi yoki linki..." 
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  style={{ flex: 1, minWidth: '180px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ced4da', outline: 'none', fontSize: '14px' }}
                />
                <button 
                  type="submit"
                  style={{ backgroundColor: '#0d6efd', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', fontSize: '14px' }}
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>

          {/* Elementlar Ro'yxati */}
          <div style={{ 
            background: '#fff', 
            padding: '24px', 
            borderRadius: '12px', 
            border: '1px solid #e9ecef',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)' 
          }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#212529', fontWeight: '600' }}>
              Kinolar va Multfilmlar Ro'yxati
            </h4>
            
            {items.map((item, index) => (
              <div 
                key={item.id} 
                style={{ 
                  display: 'flex', 
                  justify: 'space-between', 
                  alignItems: 'center', 
                  padding: '14px 0', 
                  borderBottom: index !== items.length - 1 ? '1px solid #f1f3f5' : 'none' 
                }}
              >
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#212529' }}>{item.title}</div>
                  <div style={{ fontSize: '13px', color: '#6c757d', marginTop: '3px' }}>
                    Kategoriya: <span style={{ color: '#0d6efd', fontWeight: '500' }}>{item.category}</span> | Kanal: <i>{item.channel}</i>
                  </div>
                  <div style={{ fontSize: '13px', color: '#f39c12', marginTop: '2px' }}>{'★'.repeat(item.rating)}</div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button 
                    onClick={() => setActiveVideo(item.youtubeUrl)}
                    style={{ 
                      backgroundColor: '#e50914', 
                      color: '#fff', 
                      border: 'none', 
                      padding: '7px 14px', 
                      borderRadius: '6px', 
                      cursor: 'pointer', 
                      fontSize: '13px',
                      fontWeight: 'bold'
                    }}
                  >
                    ▶ Tomosha qilish
                  </button>
                  <button 
                    onClick={() => handleEdit(item)}
                    style={{ backgroundColor: '#fff3bf', color: '#000', border: 'none', padding: '7px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
                  >
                    Tahrirlash
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    style={{ backgroundColor: '#ffe3e3', color: '#d6336c', border: 'none', padding: '7px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
                  >
                    O'chirish
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Video Tomosha qilish Modal Pleyeri */}
        {activeVideo && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            zIndex: 1000
          }}>
            <div style={{ position: 'relative', width: '90%', maxWidth: '800px', background: '#000', borderRadius: '12px', overflow: 'hidden' }}>
              <button 
                onClick={() => setActiveVideo(null)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '15px',
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  color: '#fff',
                  border: 'none',
                  fontSize: '18px',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  zIndex: 1001
                }}
              >
                ✕
              </button>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src={activeVideo}
                  title="Video Player"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // 2. LANDING PAGE
  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url("https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1200")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Islomjon TV</h2>
        <div>
          <button onClick={() => setAuthMode('login')} style={{ background: 'transparent', color: '#fff', border: 'none', marginRight: '20px', cursor: 'pointer', fontSize: '15px' }}>
            Kirish
          </button>
          <button onClick={() => setAuthMode('register')} style={{ background: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '15px' }}>
            Ro'yxatdan o'tish
          </button>
        </div>
      </nav>

      <div style={{ textAlign: 'center', marginTop: '90px', padding: '0 20px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '15px', fontWeight: 'bold' }}>Islomjon TV 🎬</h1>
        <p style={{ fontSize: '20px', color: '#e0e0e0', maxWidth: '700px', margin: '0 auto 10px' }}>
          Cheksiz filmlar, premyeralar va seriallar olamiga xush kelibsiz!
        </p>
        <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '30px' }}>
          Gollivud, Turkiya va Milliy kinosanoatining eng sara asarlarini yuqori HD/4K sifatda va professional dublyajda tomosha qiling.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px' }}>
          <button onClick={() => setIsLoggedIn(true)} style={{ padding: '12px 28px', backgroundColor: '#e50914', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            ▶ Bepul Tomosha Qilish
          </button>
          <button onClick={() => setIsLoggedIn(true)} style={{ padding: '12px 28px', backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '6px', fontSize: '16px', cursor: 'pointer' }}>
            🔑 Hisobga Kirish
          </button>
        </div>

        <div style={{ maxWidth: '380px', margin: '0 auto', background: 'rgba(0,0,0,0.85)', padding: '30px', borderRadius: '10px', border: '1px solid #333' }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '20px' }}>
            {authMode === 'login' ? 'Hisobga Kirish' : "Ro'yxatdan o'tish"}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input type="email" placeholder="Email yoki telefon..." style={{ padding: '12px', borderRadius: '6px', border: '1px solid #444', background: '#222', color: '#fff', outline: 'none' }} />
            <input type="password" placeholder="Parol..." style={{ padding: '12px', borderRadius: '6px', border: '1px solid #444', background: '#222', color: '#fff', outline: 'none' }} />
            <button onClick={() => setIsLoggedIn(true)} style={{ padding: '12px', backgroundColor: '#e50914', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', marginTop: '5px' }}>
              {authMode === 'login' ? 'Kirish' : "Ro'yxatdan o'tish"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}