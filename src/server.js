
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'node:url';
import recordsRoute from './routes/records.js'
import authRoute from './routes/auth.js'

dotenv.config();

const app = express();
const FRONTEND_ORIGIN = process.env.APP_URL;

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true
}));

app.use("/records", recordsRoute);
app.use("/auth", authRoute);

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
  });
}

export { app };
