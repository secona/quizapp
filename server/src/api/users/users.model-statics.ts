import { startSession } from 'mongoose';
import { UserModel } from './users.model';
import { Quiz } from '../quizzes/quizzes.model';

export type UserStatics = typeof userStatics;

export const userStatics = {
  async deleteCascadeById(this: UserModel, userId: any) {
    const session = await startSession();

    try {
      session.startTransaction();

      await this.deleteOne({ _id: userId }, { session });
      await Quiz.deleteMany({ author: userId }, { session });

      await session.commitTransaction();
      session.endSession();
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }
};