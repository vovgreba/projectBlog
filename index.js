const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const postRoutes = require('./routes/post-routes');
const pagesRoutes = require('./routes/pages-routes');
const PORT = 4000;

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'publick')));
app.use('/styles', express.static(path.join(__dirname + 'publick/styles')))
app.use('/img', express.static(path.join(__dirname + 'publick/img')))
app.use('/js', express.static(path.join(__dirname + 'publick/scripts')))

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(postRoutes);
app.use(pagesRoutes);

const connectDB = () => {
  try {
    mongoose.connect('mongodb://localhost:27017/Blog', {useUnifiedTopology: true, useNewUrlParser: true})
    console.log('its okay')
  } catch {
    console.log('error')
  }
}

connectDB();


app.listen(PORT, () => {
  console.log('Server has been started...')
})