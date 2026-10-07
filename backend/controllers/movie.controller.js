const { PrismaClient } = require('@prisma/client');
const { createMovieSchema, updateMovieSchema } = require('../validations/movie.validation');

const prisma = new PrismaClient();

const getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    return res.status(200).json({
      success: true,
      data: movies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Kinolarni olishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const movie = await prisma.movie.findUnique({
      where: { id, userId },
    });

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Kino topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Kinolarni olishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

const createMovie = async (req, res) => {
  try {
    const validationResult = createMovieSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        errors: validationResult.error.errors,
      });
    }

    const movie = await prisma.movie.create({
      data: validationResult.data,
    });

    return res.status(201).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Kino yarata olinmadi",
      error: error.message,
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const validationResult = updateMovieSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        errors: validationResult.error.errors,
      });
    }

    const movie = await prisma.movie.update({
      where: { id },
      data: validationResult.data,
    });

    return res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: "Yangilash uchun kino topilmadi",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Kinoni yangilashda xatolik yuz berdi",
      error: error.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.movie.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Kino muvaffaqiyatli o'chirildi",
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: "O'chirish uchun kino topilmadi",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Kinoni o'chirishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};