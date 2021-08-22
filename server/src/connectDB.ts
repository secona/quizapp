import mongoose from 'mongoose';

export default () =>
  mongoose
    .connect(process.env.MONGODB_URI!, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log('Connected to DB'));
