const express = require('express');
const router = express.Router();
const controller = require('../controllers/movie.controller');
const validate = require('../middlewares/validate');
const { requireAuth } = require('../middlewares/auth.middlewares');
const {
  createMovieSchema,
  updateMovieSchema,
} = require('../validations/movie.validation');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.use(requireAuth);

router.post('/', validate(createMovieSchema), controller.create);
router.put('/:id', validate(updateMovieSchema), controller.update);
router.delete('/:id', controller.remove);

module.exports = router;