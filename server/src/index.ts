import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello!' });
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});