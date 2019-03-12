'use strict';
const api_key = 'k1exrHmnjnbDKrItBxZHQx90RyD1TuEtB0tDMKvd';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params){
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
};

function displayResults(responseJson){
  console.log("In display results.");
  console.log(responseJson.total);
  $("#results-list").empty();
  for(let i = 0; i < responseJson.total; i++){
    $("#results-list").append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].name}</a>
      </li>
      `
    )};
    $('#results').removeClass('hidden');
};

function getNationalParks(query, maxResults){
  const params = {
    api_key: api_key,
    stateCode: query,
    maxResults
  };
  const queryString = formatQueryParams(params);
  const url = `${searchURL}?${queryString}`;

  fetch(url)
    .then(response => {
      if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`)
  });
};

function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#state-search').val();
    const maxResults = $('#max-return-results').val();
    getNationalParks(searchTerm, maxResults);
  })
};

$(document).ready(watchForm);
