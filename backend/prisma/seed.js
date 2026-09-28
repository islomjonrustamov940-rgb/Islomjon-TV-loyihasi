const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.movie.createMany({
    data: [
      {
        title: "Avatar: Suv Yo'li",
        description: "Pandora olamidagi fantastik sarguzashtlar davomi",
        genre: "Sci-Fi",
        duration: 192,
        rating: 7.8
      },
      {
        title: "Interstellar",
        description: "Insoniyatni qutqarish uchun koinot va vaqt bo'ylab sayohat",
        genre: "Sci-Fi",
        duration: 169,
        rating: 8.7
      },
      {
        title: "Uyda Yolg'iz",
        description: "Yangi yil bayramidagi qiziqarli va kulgili voqealar",
        genre: "Comedy",
        duration: 103,
        rating: 7.7
      },
      {
        title: "Kung Fu Panda",
        description: "Ajdaho jangchisiga aylangan Po ismli panda sarguzashtlari",
        genre: "Animation",
        duration: 92,
        rating: 7.6
      },
      {
        title: "Inception",
        description: "Tushlar ichiga kirib ma'lumot o'g'irlash haqidagi o'tkir syujetli film",
        genre: "Action",
        duration: 148,
        rating: 8.8
      }
    ]
  });

  console.log("Baza muvaffaqiyatli to'ldirildi!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });