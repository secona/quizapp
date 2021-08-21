import mongoose from 'mongoose';
import { UserModel } from '../users/users.model';
import { quizStatics, QuizStatics } from './quizzes.model-statics';
import Joi from '~/lib/Joi';

export interface IQuestion {
  question: string;
  choices: string[];
  correct: number;
}

export interface IQuiz {
  title: string;
  description: string;
  author: mongoose.PopulatedDoc<UserModel>;
  questions: IQuestion[];
}

export interface QuizDocument extends IQuiz, mongoose.Document {}

export interface QuizModel extends mongoose.Model<QuizDocument>, QuizStatics {}

const QuizSchema = new mongoose.Schema<QuizDocument, QuizModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    questions: [
      {
        question: {
          type: String,
          required: true,
        },
        choices: {
          type: [String],
          required: true,
        },
        correct: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

Object.assign(QuizSchema.statics, quizStatics);
export const Quiz = mongoose.model<QuizDocument, QuizModel>('Quiz', QuizSchema);

export const quizJoiSchema = Joi.object<IQuiz>({
  title: Joi.string().required(),
  description: Joi.string(),
  questions: Joi.array().items(
    Joi.object<IQuestion>({
      question: Joi.string().required(),
      choices: Joi.array().items(Joi.string()).required(),
      // fix: correct can exceed limit
      correct: Joi.number().integer().min(0).max(Joi.ref('choices.length')),
    })
  ),
});

export const answersJoiSchema = Joi.object({
  answers: Joi.array().items(Joi.number()).required(),
});
