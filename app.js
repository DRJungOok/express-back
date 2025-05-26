import express from 'express';
import cors from 'cors';
import dbConfig from './configs/db.js';
import postRoutes from './routes/postRouter.js';

const port = 3000;

const app = express();
dbConfig();

app.use(cors());
app.use(express.json());
app.use('/posts', postRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})