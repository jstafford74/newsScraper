// Grab the articles as a json


$('#getarts').on('click', async () => {
  $('#main').empty();
  try {
    const data = await $.getJSON('/api/articles');
    makeRows(data);
  } catch (error) {
    console.log('article error');
  }
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

function makeRows(data) {
  for (let i = 0; i < data.length; i++) {
    $('#main').append(`
    <div class="row">
      
      <div class="card col-7 mb-4">
        <div class="card-header h5 text-left ">${data[i].title}</div>
        <div class="card-body border border-warning">
          <h5 class="card-title text-left">
            ${data[i].title}
          </h5>
          <p class="card-text">Text goes here</p>
          <a href=${data[i].link}><button class="btn btn-danger">Link to Note</button></a> 
        </div>
      </div>
    </div>`);
  }
}
