require('dotenv').config();
const express = require('express');
const aiRoutes = require('./src/routes/ai.routes');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(cors({ origin: process.env.URL, credentials: true }));

// Routes
app.use('/ai', aiRoutes);

// Serve Frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
