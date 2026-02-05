import cors from 'cors';
import express from 'express';
import { fileURLToPath } from 'node:url';

const app = express();
const FRONTEND_ORIGIN = process.env.APP_URL;
import recordsRoute from './src/routes/records.js'
import authRoute from './src/routes/auth.js'

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true
}));

app.use("/auth", authRoute);
app.use("/records", recordsRoute);

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
  });
}

export { app };
