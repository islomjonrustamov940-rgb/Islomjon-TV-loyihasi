import { SignInButton, SignUpButton } from '@clerk/react';
import heroImg from "../assets/IslomjonTV.jpg";

function Home() {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundPosition: "center 75%",
      }}
    >
      {/* Rasm ustidagi matnlar yaxshi o'qilishi va kino atmosferasini berishi uchun qorong'u overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

      {/* Kontent bo'limi */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        
        {/* Sarlavha (Hover effekti: rang o'zgarishi va ozgina kattalashishi) */}
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-wide drop-shadow-lg transform transition duration-300 hover:scale-105 hover:text-red-500 cursor-default">
          Islomjon TV 🎬
        </h1>

        {/* Ostki sarlavha */}
        <p className="text-xl sm:text-2xl font-semibold text-gray-200 drop-shadow transform transition duration-300 hover:text-yellow-400 cursor-default">
          Cheksiz filmlar, premyeralar va seriallar olamiga xush kelibsiz!
        </p>

        {/* Tavsif matni (Hover effekti: ravshanlashish va nur taratish) */}
        <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto leading-relaxed transition duration-300 hover:text-white cursor-default">
          Eron, Turkiy, Hollivud va Milliy kinosanoatining eng sara asarlarini yuqori <span className="text-red-400 font-bold">HD/4K</span> sifatda va professional dublyajda tomosha qiling.
        </p>

        {/* Tugmalar bo'limi */}
        <div className="flex flex-wrap gap-5 justify-center pt-4">
          
          {/* Boshlash (Ro'yxatdan o'tish) Tugmasi */}
          <SignUpButton mode="modal">
            <button className="px-8 py-3.5 bg-red-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-red-700 hover:shadow-red-600/50 hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300">
              ▶ Bepul Tomosha Qilish
            </button>
          </SignUpButton>

          {/* Kirish Tugmasi */}
          <SignInButton mode="modal">
            <button className="px-8 py-3.5 bg-white/10 backdrop-blur-md border-2 border-white/40 text-white rounded-full font-bold text-lg hover:bg-white hover:text-black hover:border-white hover:scale-110 active:scale-95 transition-all duration-300">
              🔑 Hisobga Kirish
            </button>
          </SignInButton>

        </div>

      </div>
    </div>
  );
}

export default Home;