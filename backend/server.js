require('dotenv').config()
// const app = require('./src/app')

const express = require('express');
const aiRoutes = require('./src/routes/ai.routes')
const cors = require('cors')
const path =require('path')
const app = express()
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: process.env.URL,
    credentials: true
}
app.use(cors(corsOptions));


app.use('/ai', aiRoutes)

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));