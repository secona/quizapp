import { Router } from 'express';
import { User, userJoiSchema } from './users.model';
import validateBody from '~/middlewares/validateBody';
import authenticate from '~/middlewares/authenticate';
import toBoolean from '~/utils/toBoolean';

const router = Router();

// get user by userId or get my info
router.get('/:userId', authenticate, (req, res, next) => {
  const isMe = req.params.userId === 'me';
  const userId = isMe ? req.accessToken.userId : req.params.userId;

  User.findById(userId)
    .select(isMe ? '' : '-email -updatedAt')
    // .populate(toBoolean(req.query.include_quizzes) ? 'quizzes' : '')
    .populate({
      path: 'quizzes',
      select: '-questions'
    })
    .lean()
    .exec()
    .then(data => res.status(200).json({ data }))
    .catch(next);
});

// update `me` user
router.patch(
  '/me',
  authenticate,
  validateBody(userJoiSchema),
  (req, res, next) => {
    const { userId } = req.accessToken;
    const { value } = req.validationResult;

    User.findByIdAndUpdate(userId, value, { new: true })
      .lean()
      .exec()
      .then(data => res.status(200).json({ data }), next);
  }
);

// delete `me` user
router.delete('/me', authenticate, (req, res, next) => {
  const { userId } = req.accessToken;
  User.deleteOne({ _id: userId }).exec().then(res.status(204).end, next);
});

export default router;
