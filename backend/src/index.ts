import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import { authRouter } from './modules/auth/auth.routes';
import { opportunityRouter } from './modules/opportunities/opportunity.routes';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/opportunities', opportunityRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Backend API running on port ${PORT}`);
});
