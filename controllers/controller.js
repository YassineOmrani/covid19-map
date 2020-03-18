
const request = require('request')

// Controller aka endpoint logic

// Geo Coder
exports.geoCoder =  (req,res) => {
  console.log(req.params.country)
    var options = {
        method: 'GET',
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.GEOCODING_KEY}&location=${req.params.country}`,
      };
      
    request(options,  function (error, response, body) {

        if (error) throw new Error(error);
        const data = JSON.parse(body).results[0].locations[0].latLng

        res.send(data)
    });
}


exports.getAffectedCountries = (req, res) => {
    var options = {
        method: 'GET',
        url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php',
        headers: {
          'x-rapidapi-host': process.env.API_HOST,
          'x-rapidapi-key': process.env.KEY
        }
      };
      
    request(options, async function (error, response, body) {
        if (error) throw new Error(error);
        const data = JSON.parse(body)

        const formulatedData = data.affected_countries.map((e) => {
            return {
              country : e
            }
        })


        res.send(formulatedData)
    });
}


exports.casesByCountry = (req, res) => {
    var options = {
        method: 'GET',
        url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php',
        headers: {
          'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
          'x-rapidapi-key': 'ad52b86c33mshca1e9a04685f047p18c453jsn382f736f82be'
        }
      };
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
    
        res.send(body)
    });
}