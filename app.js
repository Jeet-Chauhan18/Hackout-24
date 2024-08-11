
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


  mongoose.connect('mongodb://localhost:27017/spacetest', {
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

//   const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const path = require('path');
// const multer = require('multer');
// const memoryStorage = multer.memoryStorage();


// const app = express();

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'ejs');

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // });
  
//   // Routes
// const reposRouter = require('./routes/repo');
// app.use('/repositories', reposRouter);

// const authRoutes = require('./routes/auth');
// const repoRoutes = require('./routes/repo');
// const recruiterRoutes = require('./routes/recruiter');

// app.use('/auth', authRoutes);
// app.use('/repo', repoRoutes);
// app.use('/recruiter', recruiterRoutes);

// app.get('/', (req, res) => {
//     res.render('index');
//   });
  
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = (req, res) => {
  app(req, res);
};
