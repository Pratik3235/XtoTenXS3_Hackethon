const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


const authRoutes = require('./routes/authRoutes');
const craftRoutes = require('./routes/craftRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/crafts', craftRoutes);
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => console.error('DB Connection Error:', err));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});