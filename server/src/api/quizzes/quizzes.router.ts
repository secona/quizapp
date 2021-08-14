import { Router } from 'express';
import { validateBody, getIncludes } from './quizzes.service';
import { checkOwnership } from './quizzes.middlewares';
import authenticate from '~/middlewares/authenticate';
import prisma from '~/lib/prisma';
import errors from '~/templates/errors';

const router = Router();

router.get('/:quizId', authenticate, (req, res, next) => {
  const { quizId } = req.params;
  prisma.quiz
    .findUnique({
      where: { quizId },
      include: getIncludes(req.query),
    })
    .then(data => res.json({ data }))
    .catch(next);
});

router.post('/', authenticate, (req, res, next) => {
  const { userId } = req.accessToken;
  const result = validateBody(req.body, { presence: 'required' });
  if (result.error) return next(errors.joiError(result.error));
  const { title, description, questions } = result.value;

  prisma.quiz
    .create({
      data: {
        title,
        description,
        author: { connect: { userId } },
        questions: { create: questions },
      },
      include: getIncludes(req.query)
    })
    .then(data => res.status(201).json({ data }))
    .catch(next);
});

router.patch('/:quizId', ...checkOwnership, (req, res, next) => {
  const { quizId } = req.params;
  const result = validateBody(req.body, { presence: 'optional' });
  if (result.error) return next(errors.joiError(result.error));
  const { title, description } = result.value;

  prisma.quiz
    .update({
      where: { quizId },
      data: { title, description },
      include: getIncludes(req.query),
    })
    .then(data => res.status(200).json({ data }))
    .catch(next);
});

router.delete('/:quizId', ...checkOwnership, (req, res, next) => {
  const { quizId } = req.params;
  prisma
    .$transaction([
      prisma.question.deleteMany({ where: { quizId } }),
      prisma.quiz.delete({ where: { quizId } }),
    ])
    .then(() => res.status(204).end())
    .catch(err => {
      console.log(err);
      next(err);
    });
});

export default router;
