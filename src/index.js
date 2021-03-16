import './styles.css';
// import api from './fetchCountries';
import countryCard from './templates/country-items.hbs';
import getRefs from './js/get-refs';
// import {  alert ,  defaultModules  } from '@pnotify/core';

const  _  =  require( 'lodash' ) ; 
const refs = getRefs();

refs.inputRef.addEventListener('input', _.debounce(onSearch, 500));

const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountries(searchQuery) {
    return fetch(`${BASE_URL}/name/${searchQuery}`)
        .then(response => {
            return response.json();
        })
};

function onSearch(event) {
    event.preventDefault();
    const searchQuery = event.target.value;
    
    fetchCountries(searchQuery) 
        .then(renderCountry)
        .catch(error => console.log(error))
}
function renderCountry(country) {
const markup = countryCard(country);
    refs.showCard.innerHTML = markup;
}