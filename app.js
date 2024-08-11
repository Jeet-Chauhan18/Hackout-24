
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');  
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(express.static('public'));

mongoose.connect('mongodb+srv://jlinux1999:a94YRaRwDvwSdFSt@cluster0.ltz8qfj.mongodb.net/spacehub', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



const reposRouter = require('./routes/repo');
app.use('/repositories', reposRouter);

const authRoutes = require('./routes/auth');
const repoRoutes = require('./routes/repo');
const recruiterRoutes = require('./routes/recruiter');

app.use('/auth', authRoutes);
app.use('/repo', repoRoutes);
app.use('/recruiter', recruiterRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
