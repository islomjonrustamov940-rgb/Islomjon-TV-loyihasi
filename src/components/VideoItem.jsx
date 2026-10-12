import React, { useState } from 'react';

export default function VideoItem({ item, onDelete, onEdit }) {
  const [showPlayer, setShowPlayer] = useState(false);

  // YouTube Link'dan Embed ID'ni ajratib olish
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const embedUrl = getYouTubeEmbedUrl(item.youtubeUrl);

  return (
    <div style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontWeight: '500', fontSize: '15px' }}>{item.title}</span>
          <span style={{ fontSize: '12px', color: '#888', marginLeft: '8px' }}>({item.category})</span>
          <span style={{ fontSize: '13px', color: '#f39c12', marginLeft: '10px' }}>
            {'★'.repeat(item.rating)}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {embedUrl && (
            <button 
              onClick={() => setShowPlayer(!showPlayer)} 
              style={{ backgroundColor: '#e7f5ff', color: '#1c7ed6', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
            >
              {showPlayer ? 'Yopish' : 'Tomosha qilish'}
            </button>
          )}
          <button 
            onClick={() => onEdit(item)} 
            style={{ backgroundColor: '#fff3bf', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
          >
            Tahrirlash
          </button>
          <button 
            onClick={() => onDelete(item.id)} 
            style={{ backgroundColor: '#ffe3e3', border: 'none', color: '#d6336c', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
          >
            O'chirish
          </button>
        </div>
      </div>

      {/* Video pleyeri */}
      {showPlayer && embedUrl && (
        <div style={{ marginTop: '12px', position: 'relative', paddingBottom: '40%', height: 0 }}>
          <iframe
            src={embedUrl}
            title={item.title}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '8px', border: 'none' }}
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}