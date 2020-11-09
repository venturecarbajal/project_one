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
