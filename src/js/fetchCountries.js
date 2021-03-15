// const  _  =  require( 'lodash' ) ; 
import countryCard from '../templates/country-items.hbs';

const showCard = document.querySelector('.card-item');
// const inputRef = document.querySelector('#searchQuery');

// inputRef.addEventListener('input', _.debounce(onSearch, 500));

// function onSearch(event){
//     const searchQuery = event.target.value;
// }
fetchCountries(searchQuery)
    .then(renderCountry)
    .catch(error => console.log(error))
function fetchCountries(searchQuery) {
    return fetch('https://restcountries.eu/rest/v2/all').then
        (response => {
            return response.json();
        })
};
function renderCountry(country) {
const markup = countryCard(country);
showCard.innerHTML = markup;
}
export default fetchCountries;