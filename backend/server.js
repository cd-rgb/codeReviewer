import express from 'express';
import routes from './src/routes/ai.routes.js';

import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();


const app = express();
const PORT = 8080;
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

app.use("/ai",routes);

app.get('/',(req,res)=>{
    res.send("in the root");
})