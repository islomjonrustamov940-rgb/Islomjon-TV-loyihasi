const express = require('express');
const router = express.Router();
const controller = require('../controllers/movie.Controller');
const validate = require('../../Middlewares/validate');
const { requireAuth } = require('../../Middlewares/auth.middlewares');
const {
  createMovieSchema,
  updateMovieSchema,
} = require('../../Validations/movie.validation');

router.use(requireAuth);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);


router.post('/', validate(createMovieSchema), controller.create);
router.put('/:id', validate(updateMovieSchema), controller.update);
router.delete('/:id', controller.remove);

module.exports = router;