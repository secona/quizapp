import { startSession } from 'mongoose';
import { User } from '../users/users.model';
import { QuizDocument, QuizModel } from './quizzes.model';

export type QuizStatics = typeof quizStatics;

export const quizStatics = {
  async saveAndReference(this: QuizModel, quiz: QuizDocument, userId: any) {
    const session = await startSession();

    try {
      session.startTransaction();

      const data = await quiz.save({ session });
      await User.updateOne(
        { _id: userId },
        { $push: { quizzes: quiz._id } },
        { session }
      );

      await session.commitTransaction();
      session.endSession();
      return data;
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  },

  async deleteOneAndDereference(this: QuizModel, quizId: any, userId: any) {
    const session = await startSession();

    try {
      session.startTransaction();

      await this.deleteOne({ _id: quizId }, { session });
      await User.updateOne(
        { _id: userId },
        { $pull: { quizzes: quizId } },
        { session }
      );

      await session.commitTransaction();
      session.endSession();
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }
};
