require('dotenv').config()
// const app = require('./src/app')
const PORT = process.env.PORT || 8000;
const express = require('express');
const aiRoutes = require('./src/routes/ai.routes')
const cors = require('cors')
const path =require('path')
const app = express()

app.use(cors())

// const __dirname = path.resolve()
app.use(express.json())

app.get('/', (_, res) => {
    res.send('Hello World')
})

app.use('/ai', aiRoutes)

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));