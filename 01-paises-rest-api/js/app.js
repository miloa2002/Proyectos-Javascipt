//variables
const selectRegion = document.querySelector("#selectRegion");
const paisesContent= document.querySelector("#paisesContent");

document.addEventListener("DOMContentLoaded", () => {
    try {
        const url = "https://restcountries.com/v3.1/all"
        fetch(url)
            .then(res => res.json())
            .then(data => {
                showHTML(data);
                searchCountryName(data);
                searchCountryRegion(data)
            })
    } catch (error) {
        console.log(error);
    }
})

function showHTML(countryFiltered) {

    clearHTML()
    countryFiltered.forEach(country => {
        const divCountry = document.createElement("div");
        divCountry.innerHTML = `
            <div>
                <img src="${country.flags.png}" alt="${country.name.common}">
                <h2>${country.name.common}</h2>
                <p>Capital: <span>${country.capital}</span></p>
                <p>Región: <span>${country.region}</span></p>
                <p>Población: <span>${country.population}</span></p>
            </div>
        `;

        paisesContent.appendChild(divCountry)
    });
}

function searchCountryName(countries) {
    const searchCountry = document.querySelector("#searchCountry");

    searchCountry.addEventListener("input", e => {
        const inputSearch = e.target.value.toLowerCase()

        const countryFiltered = countries.filter(country => country.name.common.toLowerCase().includes(inputSearch))

        showHTML(countryFiltered);
    })

} 

function searchCountryRegion(countries) {
    const searchCountry = document.querySelector("#selectRegion");
    searchCountry.addEventListener("change", e => {
        const inputSearch = e.target.value.toLowerCase()

        const countryFilteredRegion = countries.filter(country => country.region.toLowerCase().includes(inputSearch))

        showHTML(countryFilteredRegion)
    })
}

function clearHTML() {
    while(paisesContent.firstChild) {
        paisesContent.removeChild(paisesContent.firstChild)
    }
}