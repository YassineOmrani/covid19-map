

mapboxgl.accessToken =
"pk.eyJ1IjoieWFjaW4yMzUiLCJhIjoiY2s3eDNiczQ1MDgzNDNtcjRsN2lqdXBzOSJ9.qhBDpJIEFLc_T1BO4ml62Q";


// Fetch Number of cases per country
async function getNumberOfCasesPerCountry() {
    const data = await fetch('/api/v1/casesbycountry')
    .then(data => data.json())
    .catch(err => console.log(err))
    const countries = data.countries_stat.splice(0,50)
    const formulatedData = countries.map(async (s) => {
        const geodata = await fetch('/api/v1/'+s.country_name)
        .then(result => result.json())
        .catch(err => console.error(err))  

        const data = {
            country: s.country_name,
            nbCases: s.cases,
            nbDeaths: s.deaths,
            nbRecovered: s.total_recovered,
            geoLocation: geodata
        }
        return data
    })
    const result = await Promise.all(formulatedData).then(data => {
            return data 
    })
    return result
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



