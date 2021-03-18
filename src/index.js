import './styles.css';
import CountriesApiService from './js/fetchCountries';
import countryCard from './templates/country-items.hbs';
import getRefs from './js/get-refs';
import countryList from './templates/country-name.hbs';

import '@pnotify/core/dist/BrightTheme.css';
import { alert, error } from '@pnotify/core';

const  _  =  require( 'lodash' ) ; 
const refs = getRefs();
const countriesApiService = new CountriesApiService();

function onSearch(event) {
    countriesApiService.query = event.target.value;
    
    countriesApiService.fetchCountries() 
        .then(data => {
                if (data.length > 10) {
                    throw new Error;
                }
                renderCountry(data);
            })
        .catch((event) => {
                error({
                    text: 'Too many matches found. Please enter a more specific query!'
                });
            });
}
function renderCountry(country) {
    let markup;
    if (country.length === 1) {
        markup = countryCard(country);
        clearInput();
    }
    if (country.length >= 2 && country.length <= 10) {
        markup = countryList(country);
        clearInput();
    }
    if (country.message === 'Not Found') {
        clearInput();
         return alert('There is no such country in the database, try changing your request!');
    }
    refs.showCard.innerHTML = markup;
}

function clearInput() {
    refs.inputRef.innerHTML = '';
}

refs.inputRef.addEventListener('input', _.debounce(onSearch, 500));