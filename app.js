const express = require('express');
const path = require('path');
const reflectedRoutes = require('./routes/reflectedRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'XSS Lab',
    activePage: 'home'
  });
});

app.use('/reflected', reflectedRoutes);

app.use((req, res) => {
  res.status(404).render('404', {
    pageTitle: '404',
    activePage: ''
  });
});

app.listen(PORT, () => {
  console.log(`XSS Lab is running at http://localhost:${PORT}`);
});
