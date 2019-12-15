const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./models');
const app = express();


// A GET route for scraping the echoJS website
app.get('/scrape', async function(req, res) {
  // First, we grab the body of the html with axios
  const response = await axios.get('http://www.zerohedge.com');
  // Then, we load that into cheerio and save it to $ for a shorthand selector
  const $ = cheerio.load(response.data);

  // Now, we grab every h2 within an article tag, and do the following:
  $('.teaser-title').each(function(i, element) {

    const result = {};

    // Add the text and href of every link, and save them as properties of the result object
    result.title = $(this)
        .children('a')
        .text();
    result.link = $(this)
        .children('a')
        .attr('href');

    // Create a new Article using the `result` object built from scraping
    db.Article.create(result)
        .then(function(dbArticle) {
        // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
        // If an error occurred, log it
          console.log(err);
        });
  });

  // Send a message to the client
  res.send('Scrape Complete');
});
