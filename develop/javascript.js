function buildQueryURL() {
  // Begin building an object to contain our API call's query parameters
  // Set the API key
  var queryKey = 'R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M';

  // Grab text the user typed into the search input, add to the queryParams object
  var queryParams = $('#searchCountry').val().trim();

  var queryURL =
    'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' +
    queryParams +
    '&api-key=R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M';

  // Logging the URL so we have access to it for troubleshooting
  console.log('---------------\nURL: ' + queryURL + '\n---------------');
  console.log(queryURL + $.param(queryParams));
  return queryURL + $.param(queryParams);
}

function updatePage(NYTData) {
  var numArticles = 3;

  console.log(NYTData);

  for (var i = 0; i < numArticles; i++) {
    var article = NYTData.response.docs[i];

    var articleCount = i + 1;

    var $articleList = $('<ul>');
    $articleList.addClass('list-group');

    $('#covidNews').append($articleList);
    // If the article has a headline, log and append to $articleList
    var headline = article.headline;
    var $articleListItem = $("<li class='list-group-item articleHeadline'>");

    if (headline && headline.main) {
      console.log(headline.main);
      $articleListItem.append(
        "<span class='label label-primary'>" +
          articleCount +
          '</span>' +
          '<strong> ' +
          headline.main +
          '</strong>'
      );
    }

    // If the article has a byline, log and append to $articleList
    var byline = article.byline;

    if (byline && byline.original) {
      console.log(byline.original);
      $articleListItem.append('<h5>' + byline.original + '</h5>');
    }

    // Log section, and append to document if exists
    var section = article.section_name;
    console.log(article.section_name);
    if (section) {
      $articleListItem.append('<h5>Section: ' + section + '</h5>');
    }

    // Log published date, and append to document if exists
    var pubDate = article.pub_date;
    console.log(article.pub_date);
    if (pubDate) {
      $articleListItem.append('<h5>' + article.pub_date + '</h5>');
    }

    // Append and log url
    $articleListItem.append(
      "<a href='" + article.web_url + "'>" + article.web_url + '</a>'
    );
    console.log(article.web_url);

    // Append the article
    $articleList.append($articleListItem);
  }
}

// .on("click") function associated with the Search Button
$('#searchCountry').on('click', function (event) {
  event.preventDefault();

  // Build the query URL for the ajax request to the NYT API
  var queryURL = buildQueryURL();

  // Make the AJAX request to the API - GETs the JSON data at the queryURL
  $.ajax({
    url: queryURL,
    method: 'GET',
  }).then(updatePage);
});
