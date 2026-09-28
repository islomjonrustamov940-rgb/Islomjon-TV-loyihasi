const prisma = require('../prisma');

const getMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Filmlarni olishda xatolik yuz berdi" });
  }
};


const createMovie = async (req, res) => {
  try {
    const { title, description, genre, duration, rating } = req.body;
    const newMovie = await prisma.movie.create({
      data: {
        title,
        description,
        genre,
        duration: Number(duration),
        rating: Number(rating)
      }
    });
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ error: "Film saqlashda xatolik yuz berdi" });
  }
};

module.exports = { getMovies, createMovie };