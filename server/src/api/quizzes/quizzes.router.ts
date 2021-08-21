import { Router } from 'express';
import { checkOwnership } from './quizzes.middlewares';
import { answersJoiSchema, Quiz, quizJoiSchema } from './quizzes.model';
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

router.get('/:quizId/play', authenticate, (req, res, next) => {
  Quiz.findById(
    req.params.quizId,
    '-questions.correct',
    { lean: true },
    (err, data) => {
      if (err) return next(err);
      res.status(200).json({ data });
    }
  );
});

router.post(
  '/:quizId/check',
  authenticate,
  validateBody(answersJoiSchema),
  async (req, res, next) => {
    const quiz = await Quiz.findById(req.params.quizId).lean();
    if (!quiz) return res.status(404).end();

    const { questions } = quiz;
    const questionCount = questions.length;
    const answers = req.body.answers;

    let correctCount = 0;
    let correctAnswers = [] as number[];
    for (let i = 0; i < questionCount; i++) {
      if (questions[i].correct === answers[i]) {
        correctCount++;
        correctAnswers.push(i);
      }
    }

    res.json({
      data: {
        score: ((correctCount / questionCount) * 100).toFixed(2),
        questionCount,
        correctCount,
        correctAnswers,
      },
    });
  }
);

export default router;
