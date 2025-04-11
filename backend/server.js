import { config } from 'dotenv';
import express, { json } from 'express';
import { static as serveStatic } from 'express';
import aiRoutes from './src/routes/ai.routes.js';
import cors from 'cors';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
config({ path: "./.env" });

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: "./.env" });

const app = express();
const PORT =5000

// Middlewares
app.use(json());
app.use(cors());

// Routes
app.use('/ai', aiRoutes);

// app.use(serveStatic(join(__dirname, "../frontend/dist")));

// app.get("*", (req, res) => {
//     res.sendFile(resolve(__dirname, "../frontend/dist/index.html"));
// });



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
