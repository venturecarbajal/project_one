// this is for the name of the place
var currentPlace= $("#currentPlace")
currentPlace.text(localStorage.getItem("CountryName"))
var date = new Date()
date.setDate( date.getDate() - 1)
date = date.toISOString()
//To call the API plus the country the user choosed

$.ajax({url: "https://api.covid19api.com/live/country/"+ localStorage.getItem("Country")}).then(
    function(response){
       lastData = response[response.length -1]
       console.log(lastData)
       $("#active").text(lastData.Active)
       $("#confirmed").text(lastData.Confirmed)
       $("#deaths").text(lastData.Deaths)
       $("#recovered").text(lastData.Recovered)
    }
)

//get country info

var countryn = localStorage.getItem("Country")
var countryInfo = "https://restcountries.eu/rest/v2/name/"+ countryn;

$.ajax({

    url:countryInfo,
    method:"GET"

}).then(function(country){

   
    var population = Intl.NumberFormat().format(country[0].population);
   

    $("#flag").attr("src",country[0].flag);
    $("#population").text("Population: " + population);

});