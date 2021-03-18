import './styles.css';
import CountriesApiService from './js/fetchCountries';
import countryCard from './templates/country-items.hbs';
import getRefs from './js/get-refs';
import countryList from './templates/country-name.hbs';

import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

const  _  =  require( 'lodash' ) ; 
const refs = getRefs();
const countriesApiService = new CountriesApiService();

function onSearch(event) {
    countriesApiService.query = event.target.value;
    clearInput()
    
    countriesApiService.fetchCountries()
        .then(data => {
                renderCountry(data);
            })
        .catch((event) => {
                error({
                    text: 'There is no such country in the database, try changing your request!'
                });
            });
}

function renderCountry(country) {
    let markup = '';

    if (country.length === 1) {
        markup = countryCard(country);
        refs.showCard.innerHTML = markup;
    } else if (country.length >= 2 && country.length <= 10) {
        markup = countryList(country);
        refs.showCard.innerHTML = markup;
    } else if (country.length > 10) {
           error ({
          text: 'Too many matches found. Please enter a more specific query!',
       })  
    } else if (country.message === 'Not Found') {
          error ({
          text: 'There is no such country in the database, try changing your request!',
       })
    }
}

function clearInput() {
    refs.showCard.innerHTML = '';
}

refs.inputRef.addEventListener('input', _.debounce(onSearch, 500));