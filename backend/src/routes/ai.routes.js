import express from 'express';
const router = express.Router();
import { getResponse } from '../controller/ai.controller.js';

router.post("/get-response",getResponse);

export default router;