const { z } = require('zod');

const createMovieSchema = z.object({
  title: z.string().min(2, "Sarlavha kamida 2 ta belgidan iborat bo'lishi kerak"),
  description: z.string(),
  rating: z.number().int().min(1).max(5).optional().nullable(),
  genre: z.number().int().optional().nullable(),
  duration: z.number().int().optional().nullable(),
  userId: z.string().optional().nullable(), 
  id: z.number().int().optional().nullable(),

});

const updateMovieSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional().nullable(),
  genre: z.number().int().optional().nullable(),
  duration: z.number().int().optional().nullable(),
  userId: z.string().optional().nullable(),
  id: z.number().int().optional().nullable(),
});

module.exports = { createMovieSchema, updateMovieSchema };