// Grab the articles as a json
$(window).on('load', () => {
  $.getJSON('/scrape');
});

$('#getarts').on('click', () => {
  $.getJSON('/api/articles', function(data) {
    // For each one
    for (let i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      const vDiv = $('');
      $('#articles').append(`${data[i]._id} ${data[i].title} ${data[i].link}`);
    }
  });
});

$('#scrape').on('click', () => {

});


// Whenever someone clicks a p tag
$(document).on('click', 'p', function() {
  // Empty the notes from the note section
  $('#notes').empty();
  // Save the id from the p tag
  const thisId = $(this).attr('data-id');

  // Now make an ajax call for the Article
  $.ajax({
    method: 'GET',
    url: '/api/articles/' + thisId,
  })
  // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $('#notes').append('<h2>' + data.title + '</h2>');
        // An input to enter a new title
        $('#notes').append('<input id=\'titleinput\' name=\'title\' >');
        // A textarea to add a new note body
        $('#notes').append('<textarea id=\'bodyinput\' name=\'body\'></textarea>');
        // A button to submit a new note, with the id of the article saved to it
        $('#notes').append('<button data-id=\'' + data._id + '\' id=\'savenote\'>Save Note</button>');

        // If there's a note in the article
        if (data.note) {
        // Place the title of the note in the title input
          $('#titleinput').val(data.note.title);
          // Place the body of the note in the body textarea
          $('#bodyinput').val(data.note.body);
        }
      });
});

// When you click the savenote button
$(document).on('click', '#savenote', function() {
  // Grab the id associated with the article from the submit button
  const thisId = $(this).attr('data-id');

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: 'POST',
    url: '/api/articles/' + thisId,
    data: {
      // Value taken from title input
      title: $('#titleinput').val(),
      // Value taken from note textarea
      body: $('#bodyinput').val(),
    },
  })
  // With that done
      .then(function(data) {
      // Log the response
        console.log(data);
        // Empty the notes section
        $('#notes').empty();
      });

  // Also, remove the values entered in the input and textarea for note entry
  $('#titleinput').val('');
  $('#bodyinput').val('');
});

function renderCards() {
  data.forEach(() => {
    const vDiv = $('<div>');
    vDiv.addClass('row justify-content-center');
    const vDiv2 = $('<div>');
    vDiv2.addClass('col-1');
    const vDiv3 = $('<div>');
    vDiv3.addClass('card col-md-7');
    const vH5 = $('<h5>');
    vH5.addClass('card-header');
    vH5.attr('id', 'articles');
    const vDiv4 = $('<div>');
    vDiv4.addClass('card-body');
    const vH52 = $('<h5>');
    vH52.addClass('card-title');
    vH52.attr('id', 'title');
  });
}
