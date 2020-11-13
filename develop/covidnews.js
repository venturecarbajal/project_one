var country = localStorage.getItem('Country') + '+' + 'coronavirus';

var queryURL =
  'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' +
  country +
  '&api-key=R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M';
console.log(queryURL);
$.ajax({
  url: queryURL,
  method: 'GET',
}).then(function (response) {
  console.log(response);
  //create elements

  for (i = 0; i < 3; i++) {
    //create main div element for article
    var mainDiv = $('<div>');
    //create h element for title
    var headline = $('<h1>');
    //create a element for title link
    var titleLink = $('<p>');
    //create b element for bold title
    var bold = $('<b>');
    //create a second div element for article content
    var secondaryDiv = $('<div>');
    //create <img> element for picture
    var image = $('<img>');
    //create <p> element for article summary
    var articleSummary = $('<p>');
    // create a element
    var aEl = $('<a>');
    //add classes
    //add class "content" to main <div>
    mainDiv.addClass('content');
    //add classes "has-text-dark" to <a> element  -- it means black text
    headline.addClass('has-text-dark');
    //add classes "card level p-2" to second <div> -- it means card style / order elements equaly / padding 2px
    secondaryDiv.addClass('card level p-2');
    //add class "is-justify-content-left" to <img> element
    image.addClass('is-justify-content-left');
    //add class "has-text-justified" to <p> element
    titleLink.addClass('has-text-justified');
    //add content from api
    var test = response.response.docs[i];
    console.log(test);
    console.log(test.multimedia);
    //add title to <b> element
    bold.text(test.headline.main);
    //add summary to <p> element
    secondaryDiv.text(test.snippet);
    //set href attribute to <a> element with the link to the article
    
    //set attribute src to img element to the image preview from the api
    var imageLink = 'https://nytimes.com/';
    // protecting against undefined values
    if (test?.multimedia[0]?.url) {
      image.attr('src', imageLink + test.multimedia[0].url);
    }
    //append elements
    //append <img> to second div
    secondaryDiv.append(image);
    //append <p> to second div
    titleLink.attr('href', test.web_url);
    headline.append(titleLink);
    mainDiv.append(headline);
    secondaryDiv.append(titleLink);
    //append <b> to <a>
    aEl.append(bold);
    //append <a> to <h1>
    headline.append(aEl);
    //append <h1> to main <div>
    mainDiv.append(headline);
    //append second <div> to main <div>
    mainDiv.append(secondaryDiv);
    mainDiv.addClass("p-2");
    $('#news-card').append(mainDiv);
    console.log(mainDiv);
  }
  /*
<div class="content">
<h1><a class="has-text-dark" href="href=wikipedia.com"><b>Article Title</b></a></h1>
    <div class="card level p-2">
        <img class="is-justify-content-left" src="Preview.jpg" alt="art-img">
        <p class="has-text-justified">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, rem! Molestiae enim deleniti in maxime incidunt veritatis praesentium, expedita commodi consectetur perferendis reprehenderit provident impedit? Est animi voluptas natus unde.</p>
    </div>
</div>
*/
});

// $('#searchCountry').on('click', function(){
//     var selectedCountry
// })
