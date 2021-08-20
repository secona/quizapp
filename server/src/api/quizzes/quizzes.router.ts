import { Router } from 'express';
import { checkOwnership } from './quizzes.middlewares';
import { Quiz, quizJoiSchema } from './quizzes.model';
import validateBody from '~/middlewares/validateBody';
import authenticate from '~/middlewares/authenticate';

const router = Router();

// get quizzes by quizid
router.get('/:quizId', authenticate, (req, res, next) => {
  const { quizId } = req.params;
  Quiz.findById(quizId, '-questions', { lean: true })
    .exec()
    .then(data => res.json({ data }))
    .catch(next);
});

// create new quiz
router.post(
  '/',
  authenticate,
  validateBody(quizJoiSchema),
  (req, res, next) => {
    const { userId } = req.accessToken;
    const { value } = req.validationResult;
    const newQuiz = new Quiz({ ...value, author: userId });

    Quiz.saveAndReference(newQuiz, userId)
      .then(data => res.status(201).json({ data }))
      .catch(next);
  }
);

// edit quiz info by quizId
router.put(
  '/:quizId',
  ...checkOwnership,
  validateBody(quizJoiSchema),
  (req, res, next) => {
    const { quizId } = req.params;
    const { value } = req.validationResult;
    Quiz.findByIdAndUpdate(quizId, value, { new: true, lean: true })
      .exec()
      .then(data => res.status(200).json({ data }))
      .catch(next);
  }
);

// delete quiz by quizId
router.delete('/:quizId', ...checkOwnership, (req, res, next) => {
  const { quizId } = req.params;
  const { userId } = req.accessToken;
  Quiz.deleteOneAndDereference(quizId, userId)
    .then(() => res.status(204).end())
    .catch(err => next(err));
});

export default router;
