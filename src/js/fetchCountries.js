import countryCard from '../templates/country-items.hbs';

const showCard = document.querySelector('.card-item');
function fetchCountries(searchQuery) {
    fetch('https://restcountries.eu/rest/v2/name/Canada')
        .then(response => {
            return response.json();
        })
        .then(country => {
            console.log(country);
            const markup = countryCard(country);
            showCard.innerHTML = markup;
        })
        .catch(error => {
         console.log(error);
     })
};
fetchCountries();
export default fetchCountries;