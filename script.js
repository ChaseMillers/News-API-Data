'use strict';
const apiKey = '23bde539d93344af9341bf30f0ac89fc'

function fetchInfo(url, key) {
  console.log (url)

  fetch (url, key)
  .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-errorMessage').text(`There are no matching search results`);
      $('.results').empty();
    });
}

function UrlConstruction(searchValue, sortOrder, currentSelectedSources) {
    console.log(`${searchValue} is the search value`);
    console.log(`${sortOrder} is how the search will be sorted`);
    let newsSource = '';
    for ( let i = 0; i < currentSelectedSources.length; i ++ ){
      if ( $(currentSelectedSources[i]).is(":checked")){
          newsSource += $(currentSelectedSources[i]).val()+',';
      }
  }
    
    const key = {headers: new Headers ({"X-Api-Key": apiKey})};
    let url = 'https://newsapi.org/v2/everything?q=$' +
    searchValue + 
    sortOrder + "sources=" +
    newsSource; 
    
    console.log(`${newsSource} is the new array`);
    fetchInfo(url, key);
}


function displayResults(responseJson){ 
    console.log(responseJson);
    $('#js-errorMessage').empty();
    let max = $('#js-maxResults').val();
    let newHTML = '';
    for (let i = 0; i < responseJson.articles.length & i<max; i ++){
    newHTML +=
    `<div class="newsColumn">
    <h3>${responseJson.articles[i].source.name}</h3>
    <h4>${responseJson.articles[i].title}</h4>
    <img src='${responseJson.articles[i].urlToImage}'>
    <p>${responseJson.articles[i].description}</p>
    <a href ="${responseJson.articles[i].url}" target="_blank">
    ${responseJson.articles[i].url}</a>
    </div>` 
    }
    $('.results').html(
      `${newHTML}`);
    $('.text').removeClass('hidden');
} 


function watchForm() {
  $('form').submit(event => {
    let searchValue = $('#js-searchEntry').val()+'&';
    let sortOrder = 'sortBy='+ $('#js-sortOrder').val()+'&';
    let currentSelectedSources = $('.js-sourceSelection')

    event.preventDefault();
    UrlConstruction(searchValue, sortOrder, currentSelectedSources);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});
