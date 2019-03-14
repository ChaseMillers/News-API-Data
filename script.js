'use strict';
const apiKey = '23bde539d93344af9341bf30f0ac89fc'

function fetchInfo(bbcUrl, newYorkTimesUrl, foxUrl, cnnUrl, elseUrl) {
  console.log (bbcUrl, newYorkTimesUrl, foxUrl, cnnUrl)
  const key = {headers: new Headers ({"X-Api-Key": apiKey})};
  
  if(bbcUrl !== ''){
    fetch (bbcUrl,key)
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
  else if(newYorkTimesUrl !== ''){
    fetch (newYorkTimesUrl,key)
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
  else if(foxUrl !== ''){
      fetch (foxUrl,key)
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
    else if(cnnUrl !== ''){
        fetch (cnnUrl,key)
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
        else{
          fetch (elseUrl,key)
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
}

function UrlConstruction(searchValue, sortBy, currentSelectedSources, max) {
    console.log(`${searchValue} is the search value`);
    
    let bbcValue = $('#bbcCheck:checked').val();
    let newYorkTimesValue = $('#newYorkTimesCheck:checked').val();
    let foxValue = $('#foxCheck:checked').val();
    let cnnValue = $('#cnnCheck:checked').val();
      
  if(bbcValue == 'bbc-news'){
    let bbcUrl = 'https://newsapi.org/v2/everything?language=en&sources=bbc-news&' +
    searchValue + 
    max +
    sortBy;
    fetchInfo(bbcUrl);
  }

  if(newYorkTimesValue == 'the-new-york-times'){
    let newYorkTimesUrl = 'https://newsapi.org/v2/everything?language=en&sources=the-new-york-times&' +
    searchValue + 
    max +
    sortBy;
    fetchInfo(newYorkTimesUrl);
  }

  if(foxValue == 'fox-news'){
    let foxUrl = 'https://newsapi.org/v2/everything?language=en&sources=fox-news&' +
    searchValue + 
    max +
    sortBy;
    fetchInfo(foxUrl);
  }

  if(cnnValue == 'cnn'){
    let cnnUrl = 'https://newsapi.org/v2/everything?language=en&sources=cnn&' +
    searchValue + 
    max +
    sortBy;
    fetchInfo(cnnUrl);
  }

  else if (currentSelectedSources == undefined){
    let elseUrl = 'https://newsapi.org/v2/everything?language=en&sources=cnn,the-new-york-times,fox-news,bbc-news&' +
    searchValue + 
    max +
    sortBy;
    fetchInfo(elseUrl);
  }
}

function displayResults(responseJson){ 
    console.log(responseJson);
    $('#js-errorMessage').empty();

    let topHTML = '';
    let bbcHTML = '';
    let newHTML = '';
    let foxHTML = '';
    let cnnHTML = '';
    let bbcValue = $('#bbcCheck:checked').val();
    let newYorkTimesValue = $('#newYorkTimesCheck:checked').val();
    let foxValue = $('#foxCheck:checked').val();
    let cnnValue = $('#cnnCheck:checked').val();
 
    for (let i = 0; i < responseJson.articles.length; i ++){
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
      <h4>${responseJson.articles[i].title}</h4>
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
      topHTML +=
      `<div class="newsColumn">
      <h4>${responseJson.articles[i].title}</h4>
      <img src='${responseJson.articles[i].urlToImage}'>
      <p>${responseJson.articles[i].description}</p>
      <a href ="${responseJson.articles[i].url}" target="_blank">
      ${responseJson.articles[i].url}</a>
      </div>`;
      $('#topHeadLines').html(
        `${topHTML}`);
      $('.topHeadLinesTitle, #topHeadLines').css('display','flex');
    }
} }

function watchForm() {
  $('form').submit(event => {
    let searchValue = 'q=' + $('#js-searchEntry').val()+'&';
    let max = 'pageSize=' + $('#js-maxResults').val()+'&';
    let sortBy = 'sortBy='+ $('#js-sortOrder').val();
    let title = $("#js-sortOrder option:selected").text();
    let currentSelectedSources = $('.js-sourceSelection:checked').val();
    console.log(`this is ${currentSelectedSources}`);
    $(".topHeadLinesTitle").html(`<h3>${title} Headlines</h3>`)
    event.preventDefault();
    clear();
    UrlConstruction(searchValue, sortBy, currentSelectedSources, max);
  });
}

function clear(){
  $('.bbcTitle, #bbc').css('display','none');
  $('.newYorkTimesTitle, #newYorkTimes').css('display','none'); 
  $('.topHeadLinesTitle, #topHeadLines').css('display','none');
  $('.foxTitle, #fox').css('display','none'); 
  $('.cnnTitle, #cnn').css('display','none');
  $('.results').empty();

}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});
