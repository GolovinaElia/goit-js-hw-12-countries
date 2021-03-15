import './styles.css';
import countryRef from '../src/js/fetchCountries.js';

const _ = require('lodash');
const inputRef = document.querySelector('#searchQuery');
inputRef.addEventListener('input', _.debounce(onSearch, 500));
function onSearch(event){
    const search = event.target.value;
//     const filteredCountries = countryRef.filter(country => {
//         if (search === '') return true;

//         return country.includes(search);
//     })
//     console.log(filteredCountries);
}