const express = require('express');
// const exphbs = require('express-handlebars');
const logger = require('morgan');
const mongoose = require('mongoose');

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require('axios');
const cheerio = require('cheerio');

// Require all models
const db = require('./models');

const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger('dev'));
// Parse request body as JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// Make public a static folder
app.use(express.static('public'));

// Handlebars Connection //
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/newsScraper';
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

// Routes

// A GET route for scraping the echoJS website
app.get('/scrape', async function(req, res) {
  // First, we grab the body of the html with axios

  const response = await axios.get('http://www.zerohedge.com');

  const $ = cheerio.load(response.data);


  $('article').each(function(i, el) {
    const result = {};
    result.title = $(this).children('h2').children('a').children('span').text();
    result.text = $(this).children('section').children('div').children('div').children('p').text();
    console.log(result.text);
    result.link = $(this).children('h2').children('a')
        .attr('href');


    db.Article.create(result, {upsert: true})
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
  });

  // Send a message to the client
  res.send('Scrape Complete');
});
// Route for getting all Articles from the db
app.get('/api/articles', async function(req, res) {
  // TODO: Finish the route so it grabs all of the articles
  try {
    const data = await db.Article.find({});
    console.log(data);
    res.json(data);
  } catch (err) {
    res.status(500).json({error: {name: err.name, message: err.message}});
  }
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get('/api/articles/:id', async function(req, res) {
  // TODO
  // ====
  // Finish the route so it finds one article using the req.params.id,
  // and run the populate method with "note",
  // then responds with the article with the note included
  const id = req.params.id;

  try {
    const resp = await db.Article.findOne({_id: id})
        .populate('note');

    res.json(resp);
  } catch (err) {
    res.status(500).json({error: {name: err.name, message: err.message}});
  }
});

// Route for saving/updating an Article's associated Note
app.post('/api/articles/:id', async function(req, res) {
  // TODO
  // ====
  // save the new note that gets posted to the Notes collection
  // then find an article from the req.params.id
  // and update it's "note" property with the _id of the new note


  try {
    const dbNote = await db.Note.create(req.body);
    const dbArticle = await db.Article.findOneAndUpdate(

        {id_: req.params.id},
        {note: dbNote._id},
        {new: true},

    );

    res.json(dbArticle);
  } catch (err) {
    res.status(500).json({error: {name: err.name, message: err.message}});
  }
});

// Set the app to listen on PORT
app.listen(PORT, function() {
  console.log('App running on http://localhost:%s', PORT);
});
