import { useState, useEffect } from 'react';
import { useUser } from '@clerk/react';

function Dashboard() {
  const { user } = useUser();

  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setItems([
          { id: 1, title: 'Birinchi vazifa' },
          { id: 2, title: 'Ikkinchi vazifa' },
        ]);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      setItems(items.map((item) => (item.id === editingId ? { ...item, title } : item)));
      setEditingId(null);
    } else {
      const newItem = {
        id: Date.now(),
        title: title,
      };
      setItems([...items, newItem]);
    }
    setTitle('');
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
  };

  const handleCancel = () => {
    setEditingId(null);
    setTitle('');
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Salom, {user?.firstName || user?.username || 'foydalanuvchi'}!
        </h1>
        <p className="text-gray-600 mt-1">Dashboard'dagi elementlarni boshqarish</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {editingId ? "Elementni tahrirlash" : "Yangi element qo'shish"}
        </h2>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nomi..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {editingId ? 'Saqlash' : "Qo'shish"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Bekor qilish
            </button>
          )}
        </form>
      </div>

      {isLoading && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mb-2"></div>
          <p>Ma'lumotlar yuklanmoqda...</p>
        </div>
      )}

      {!isLoading && isError && (
        <div className="bg-red-50 text-red-600 rounded-2xl border border-red-200 p-8 text-center">
          Xatolik yuz berdi! Ma'lumotlarni yuklab bo'lmadi.
        </div>
      )}

      {!isLoading && !isError && items.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Hozircha hech narsa yo'q</h2>
          <p className="text-gray-500">Yangi element qo'shish uchun yuqoridagi formadan foydalaning.</p>
        </div>
      )}

      {!isLoading && !isError && items.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Elementlar ro'yxati</h2>
          <ul className="divide-y divide-gray-100">
            {items.map((item) => (
              <li key={item.id} className="py-3 flex justify-between items-center">
                <span className="text-gray-700 font-medium">{item.title}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition text-sm"
                  >
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition text-sm"
                  >
                    O'chirish
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;