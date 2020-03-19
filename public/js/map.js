

mapboxgl.accessToken =
"pk.eyJ1IjoieWFjaW4yMzUiLCJhIjoiY2s3eDNiczQ1MDgzNDNtcjRsN2lqdXBzOSJ9.qhBDpJIEFLc_T1BO4ml62Q";


// Fetch Number of cases per country
async function getNumberOfCasesPerCountry() {
    /******************************** */
    // should add spinner aka loading 
    // compoenent for wait all async
    // code ...
    /******************************** */
    try {
        const CountriesResponse = await fetch('/api/v1/casesbycountry');
        const dataCountries = await CountriesResponse.json(); // should use 2 await with fetch 
        // console.log(dataCountries);
        const countries = dataCountries.countries_stat.splice(0,50);
        // console.log(countries);
        const formulatedData = countries.map(async ({ country_name, cases, deaths, total_recovered }) => {
            try {
                // better with template sring --ES6
                const geodataReponse = await fetch(`/api/v1/${country_name}`);
                const geodata = await geodataReponse.json();
                
                const data = { // desturcutre is better for your code --clean-code
                    country: country_name,
                    nbCases: cases,
                    nbDeaths: deaths,
                    nbRecovered: total_recovered,
                    geoLocation: geodata
                };

                return data;
            } catch (error) {
               console.log(error); // you can return or throw error if you want .. 
            }
        });

        // not the best way but it's work 
        // should update the workflow inside 
        // the map func .. 
        const result = await Promise.all(formulatedData).then(data => data);
        // console.log(result);
        
        return result;
    } catch (error) {
        console.log(err);
    }
}



var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v10",
    zoom: 1
});

var overlay = document.getElementById('map-overlay');

// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: false
    });

getNumberOfCasesPerCountry().then(data => {
    data.forEach((e) => {
        new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([e.geoLocation.lng,e.geoLocation.lat])
        .setHTML(`<p 
            style="color: red;"
            font-weight:bold;
        >${e.country}</p>
        <p>${e.nbCases} : عدد الحالات</p>
        <p> ${e.nbRecovered} :تعافى</p>
        <p> ${e.nbDeaths} :وفيات</p>
        `)
        .addTo(map);
    })
})



