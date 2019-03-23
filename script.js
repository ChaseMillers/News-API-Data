'use strict';
const apiKey = '23bde539d93344af9341bf30f0ac89fc'

function fetchInfo(currentURL, currentSource) {
  const key = {headers: new Headers ({"X-Api-Key": apiKey})};
  
  if(currentSource == 'BBC'){
    fetch (currentURL,key)
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('.bbcTitle, #bbc').css('display','flex'); 
        $('#bbc').html(
        `<div class="newsColumn">
        <h4>BBC has no search results for this topic.</h4>
        </div>`);
    });
  }
  
  else if(currentSource == 'NYT'){
    fetch (currentURL,key)
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('.newYorkTimesTitle, #newYorkTimes').css('display','flex');
        $('#newYorkTimes').html(
        `<div class="newsColumn">
        <h4>The New York Times has no search results for this topic.</h4>
        </div>`);
      });
    }
  else if(currentSource == 'FOX'){
      fetch (currentURL,key)
      .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
           $('.foxTitle, #fox').css('display','flex');
        $('#fox').html(
        `<div class="newsColumn">
        <h4>Fox News has no search results for this topic.</h4>
        </div>`);
        });
      }
    else if(currentSource == 'CNN'){
        fetch (currentURL,key)
        .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(response.statusText);
          })
          .then(responseJson => displayResults(responseJson))
          .catch(err => {
                  $('.cnnTitle, #cnn').css('display','flex');
        $('#cnn').html(
        `<div class="newsColumn">
        <h4>CNN has no search results for this topic.</h4>
        </div>`);
        });
      }
        else{
          fetch (currentURL,key)
          .then(response => {
              if (response.ok) {
                return response.json();
              }
              throw new Error(response.statusText);
            })
            .then(responseJson => displayResults(responseJson))
            .catch(err => {
              $('.elseTitle, #else').css('display','flex');
              $('#else').html(
              `<div class="newsColumn">
              <h4>There are no search results for this topic.</h4>
              </div>`);
              });
            }
        }

function UrlConstruction(searchValue, sortBy, currentSelectedSources, max) {
    let bbcValue = $('#bbcCheck:checked').val();
    let newYorkTimesValue = $('#newYorkTimesCheck:checked').val();
    let foxValue = $('#foxCheck:checked').val();
    let cnnValue = $('#cnnCheck:checked').val();
    
  if(bbcValue == 'bbc-news'){
    let bbcUrl = 'https://newsapi.org/v2/everything?language=en&sources=bbc-news&' +
    searchValue + 
    max +
    sortBy;
    fetchInfo(bbcUrl, "BBC");
  }

  if(newYorkTimesValue == 'the-new-york-times'){
    let newYorkTimesUrl = 'https://newsapi.org/v2/everything?language=en&sources=the-new-york-times&' +
    searchValue + 
    max +
    sortBy;
    fetchInfo(newYorkTimesUrl, "NYT");
  }

  if(foxValue == 'fox-news'){
    let foxUrl = 'https://newsapi.org/v2/everything?language=en&sources=fox-news&' +
    searchValue + 
    max +
    sortBy;
    fetchInfo(foxUrl, "FOX");
  }

  if(cnnValue == 'cnn'){
    let cnnUrl = 'https://newsapi.org/v2/everything?language=en&sources=cnn&' +
    searchValue + 
    max +
    sortBy;
    fetchInfo(cnnUrl, "CNN");
  }

  else if (currentSelectedSources == undefined){
    let elseUrl = 'https://newsapi.org/v2/everything?language=en&sources=cnn,the-new-york-times,fox-news,bbc-news&' +
    searchValue + 
    max +
    sortBy;
    fetchInfo(elseUrl, "ELSE");
  }
}

function displayResults(responseJson){ 
    $('#js-errorMessage').empty();

    let elseHTML = '';
    let bbcHTML = '';
    let newHTML = '';
    let foxHTML = '';
    let cnnHTML = '';
    let bbcValue = $('#bbcCheck:checked').val();
    let newYorkTimesValue = $('#newYorkTimesCheck:checked').val();
    let foxValue = $('#foxCheck:checked').val();
    let cnnValue = $('#cnnCheck:checked').val();
    

    for (let i = 0; i < responseJson.articles.length || responseJson.totalResults==0; i ++){
      if ( responseJson.articles[i].source.name == "BBC News" && bbcValue == 'bbc-news'){
    bbcHTML +=
    `<div class="newsColumn">
    <h4>${responseJson.articles[i].title}</h4>
    <img src='${responseJson.articles[i].urlToImage}'>
    <p>${responseJson.articles[i].description}</p>
    <a href ="${responseJson.articles[i].url}" target="_blank">
    ${responseJson.articles[i].url}</a>
    </div>`;
    $('#bbc').html(
      `${bbcHTML}`);
    $('.bbcTitle, #bbc').css('display','flex'); 
    }
    
    else if ( responseJson.articles[i].source.name == "The New York Times" && newYorkTimesValue == 'the-new-york-times'){
      newHTML +=
      `<div class="newsColumn">
      <h4>${responseJson.articles[i].title}</h4>
      <img src='${responseJson.articles[i].urlToImage}'>
      <p>${responseJson.articles[i].description}</p>
      <a href ="${responseJson.articles[i].url}" target="_blank">
      ${responseJson.articles[i].url}</a>
      </div>`;
      $('#newYorkTimes').html(
        `${newHTML}`);
      $('.newYorkTimesTitle, #newYorkTimes').css('display','flex'); 
      }

    else if ( responseJson.articles[i].source.name == "Fox News" && foxValue == 'fox-news'){
      foxHTML +=
      `<div class="newsColumn">
      <h4><b>${responseJson.articles[i].title}</b></h4>
      <img src='${responseJson.articles[i].urlToImage}'>
      <p>${responseJson.articles[i].description}</p>
      <a href ="${responseJson.articles[i].url}" target="_blank">
      ${responseJson.articles[i].url}</a>
      </div>`;
      $('#fox').html(
        `${foxHTML}`);
      $('.foxTitle, #fox').css('display','flex'); 
      }

    else if ( responseJson.articles[i].source.name == "CNN" && cnnValue == 'cnn'){
      cnnHTML +=
      `<div class="newsColumn">
      <h4>${responseJson.articles[i].title}</h4>
      <img src='${responseJson.articles[i].urlToImage}'>
      <p>${responseJson.articles[i].description}</p>
      <a href ="${responseJson.articles[i].url}" target="_blank">
      ${responseJson.articles[i].url}</a>
      </div>`;
      $('#cnn').html(
        `${cnnHTML}`);
      $('.cnnTitle, #cnn').css('display','flex'); 
      }
      
    else {
      elseHTML +=
      `<div class="newsColumn">
      <h4>${responseJson.articles[i].title}</h4>
      <img src='${responseJson.articles[i].urlToImage}'>
      <p>${responseJson.articles[i].description}</p>
      <a href ="${responseJson.articles[i].url}" target="_blank">
      ${responseJson.articles[i].url}</a>
      </div>`;
      $('#else').html(
        `${elseHTML}`);
      $('.elseTitle, #else').css('display','flex');
    }
} }

function watchForm() {
  $('form').submit(event => {
    let searchValue = 'q=' + $('#js-searchEntry').val()+'&';
    let max = 'pageSize=' + $('#js-maxResults').val()+'&';
    let sortBy = 'sortBy='+ $('#js-sortOrder').val();
    let title = $("#js-sortOrder option:selected").text();
    let currentSelectedSources = $('.js-sourceSelection:checked').val();
    
    $(".elseTitle").html(`<h3>${title} Headlines</h3>`)
    event.preventDefault();
    clear();
    UrlConstruction(searchValue, sortBy, currentSelectedSources, max);
  });
}

function clear(){
  $('.bbcTitle, #bbc').css('display','none');
  $('.newYorkTimesTitle, #newYorkTimes').css('display','none'); 
  $('.elseTitle, #else').css('display','none');
  $('.foxTitle, #fox').css('display','none'); 
  $('.cnnTitle, #cnn').css('display','none');
  $('.results').empty();

}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});