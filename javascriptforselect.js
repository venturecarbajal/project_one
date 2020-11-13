//to conect the api countries with the drop down
searchItems = $("#searchItems")
selectedCountry = null
selectedCountryName = null
selectedCountryCode = null

$.ajax({url: "https://api.covid19api.com/countries", method: "get"}).then(
    function(response){
        response.sort(compare)
        for (i of response){

            a = $("<a>")
            a.text(i.Country)
            a.attr("data-slug",i.Slug)
            a.attr("data-code",i.ISO2)
            a.attr("href", "#")
            a.addClass("dropdown-item")
            a.appendTo(searchItems)

        }
    }
)

//
$(document).on("click",".dropdown-item",function(){
    $("#hover-me").text($(this).text())
    selectedCountry = $(this).attr("data-slug")
    selectedCountryName = $(this).text()
    selectedCountryCode = $(this).attr("data-code")
    console.log(selectedCountry)
})

function compare( a, b ) {
    if ( a.Country < b.Country ){
      return -1;
    }
    if ( a.Country > b.Country ){
      return 1;
    }
    return 0;
  }


$("#searchButton").on("click",function(){
    localStorage.setItem("CountryName", selectedCountryName)
    localStorage.setItem("Country",selectedCountry)
    localStorage.setItem("countryCode",selectedCountryCode)
    window.location = "./main.html"
})