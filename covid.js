// this is for the name of the place
var currentPlace= $("#currentPlace")
currentPlace.text(localStorage.getItem("CountryName"))
var date = new Date()
date.setDate( date.getDate() - 1)
date = date.toISOString()
//To call the API plus the country the user choosed

$.ajax({url: "https://api.covid19api.com/live/country/"+ localStorage.getItem("Country")}).then(
    function(response){
        if(response.length > 0){
            lastData = response[response.length -1]
            console.log(lastData)
     
            //en-IN formatting for numbers
     
            var ActiveFormatted = Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(lastData.Active);
            var ConfirmedFormatted = Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(lastData.Confirmed);
            var DeathsFormatted = Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(lastData.Deaths);
            var RecoveredFormatted = Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(lastData.Recovered);
     
            $("#active").text(ActiveFormatted);
            $("#confirmed").text(ConfirmedFormatted);
            $("#deaths").text(DeathsFormatted);
            $("#recovered").text(RecoveredFormatted);
        }
        else{
            var noInfoText = "0"

            $("#active").text(noInfoText);
            $("#confirmed").text(noInfoText);
            $("#deaths").text(noInfoText);
            $("#recovered").text(noInfoText);


        }

    }
)

//get country info

var countryCode = localStorage.getItem("countryCode")
var countryInfo = "https://restcountries.eu/rest/v2/alpha?codes="+ countryCode;

$.ajax({

    url:countryInfo,
    method:"GET"

}).then(function(country){

    
    var population = Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(country[0].population);
   

    $("#flag").attr("src",country[0].flag);
    $("#population").text("Population: " + population);

});