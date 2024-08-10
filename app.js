// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const path = require('path');
// const app = express();

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'ejs');

// // Database connection
// mongoose.connect('mongodb://localhost/github_like_app', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// // Routes
// const authRoutes = require('./routes/auth');
// const repoRoutes = require('./routes/repo');
// const recruiterRoutes = require('./routes/recruiter');

// app.use('/auth', authRoutes);
// app.use('/repo', repoRoutes);
// app.use('/recruiter', recruiterRoutes);

// // Home route
// app.get('/', (req, res) => {
//     res.render('index');
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');  // Add multer
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Database connection
mongoose.connect('mongodb://localhost/github_like_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
const authRoutes = require('./routes/auth');
const repoRoutes = require('./routes/repo');
const recruiterRoutes = require('./routes/recruiter');

app.use('/auth', authRoutes);
app.use('/repo', repoRoutes);
app.use('/recruiter', recruiterRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('index');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
