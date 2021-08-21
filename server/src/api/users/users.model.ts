import mongoose from 'mongoose';
import { userStatics, UserStatics } from './users.model-statics';
import { QuizModel } from '../quizzes/quizzes.model';
import { nanoid } from '~/lib/nanoid';
import Joi from '~/lib/Joi';

export interface IUser {
  email: string;
  username: string;
  name: string;
  picture: string;
  quizzes: mongoose.PopulatedDoc<QuizModel[]>;
}

export interface UserDocument extends IUser, mongoose.Document {}

export interface UserModel extends mongoose.Model<UserDocument>, UserStatics {}

const UserSchema = new mongoose.Schema<UserDocument, UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      default: nanoid(),
    },
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    quizzes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
      },
    ],
  },
  {
    timestamps: true,
  }
);

Object.assign(UserSchema.statics, userStatics);
export const User = mongoose.model<UserDocument, UserModel>('User', UserSchema);

export const userJoiSchema = Joi.object<IUser>({
  name: Joi.string(),
  username: Joi.string().regex(/^[_\.a-zA-Z0-9]+$/).min(3).max(20),
});

