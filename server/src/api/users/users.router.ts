import { Router } from 'express';
import { User, userJoiSchema } from './users.model';
import { getPopulateOptions } from './users.helpers';
import authenticate from '~/middlewares/authenticate';
import mongoIdParam from '~/middlewares/mongoIdParam';
import validateBody from '~/middlewares/validateBody';

const router = Router();

router.get('/me', authenticate, (req, res, next) => {
  const { userId } = req.accessToken;
  User.findById(userId)
    .populate(getPopulateOptions(req.query))
    .lean()
    .exec()
    .then(data => res.status(200).json({ data }))
    .catch(next);
});

// get user by userId
router.get(
  '/:userId',
  mongoIdParam('userId'),
  authenticate,
  (req, res, next) => {
    const { userId } = req.params;
    User.findById(userId)
      .select('-email -updatedAt')
      .populate(getPopulateOptions(req.query))
      .lean()
      .exec()
      .then(data => res.status(200).json({ data }))
      .catch(next);
  }
);

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
      .then(data => res.status(200).json({ data }))
      .catch(next);
  }
);

// delete `me` user
router.delete('/me', authenticate, (req, res, next) => {
  const { userId } = req.accessToken;
  User.deleteCascadeById(userId)
    .then(() => res.status(204).end())
    .catch(next);
});

export default router;
