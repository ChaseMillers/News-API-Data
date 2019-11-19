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
        $('#bbc').html(
        `<div class="slide">
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
        $('#newYorkTimes').html(
        `<div class="slide">
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
        $('#fox').html(
        `<div class="slide">
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
        $('#cnn').html(
        `<div class="slide">
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
              $('#else').html(
              `<div class="slide">
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
    $('footer').css('position','initial')
    let elseHTML = '';
    let bbcHTML = '';
    let newHTML = '';
    let foxHTML = '';
    let cnnHTML = '';
    let bbcValue = $('#bbcCheck:checked').val();
    let newYorkTimesValue = $('#newYorkTimesCheck:checked').val();
    let foxValue = $('#foxCheck:checked').val();
    let cnnValue = $('#cnnCheck:checked').val();

    for (let i = 0; i < responseJson.articles.length || responseJson.totalResults==0; i ++)
    {
    let format =
    `<div class="slides">
          <div class="slide" id=${i}>
          <a href ="${responseJson.articles[i].url}"
          target="_blank"> 
          <h4>${responseJson.articles[i].title}</h4></a>
            <img src='${responseJson.articles[i].urlToImage}'>
            <span class="description"> 
              <p>${responseJson.articles[i].description}</p>
            </span> 
            <a href ="${responseJson.articles[i].url}" target="_blank">
            Link</a>
          </div>
      </div>`;
      
      if ( responseJson.articles[i].source.name == "BBC News" && bbcValue == 'bbc-news'){
    bbcHTML +=
     `${format}`;
    $('#bbc').html(`${bbcHTML}`);
    $('.bbcButtons').css('display','initial')
    $('.bbcTitle, #bbc').css('display','flex'); 
    $('.bbcTitle').css('display','inline'); 
    }
    
    else if ( responseJson.articles[i].source.name == "The New York Times" && newYorkTimesValue == 'the-new-york-times'){
      newHTML +=
       `${format}`;
      $('#newYorkTimes').html(`${newHTML}`);
      $('.nytButtons').css('display','initial');
      $('#newYorkTimes').css('display','flex'); 
      $('.newYorkTimesTitle').css('display','inline'); 
      }

    else if ( responseJson.articles[i].source.name == "Fox News" && foxValue == 'fox-news'){
      foxHTML +=
       `${format}`;
      $('#fox').html(`${foxHTML}`);
      $('.foxButtons').css('display','initial')
      $(' #fox').css('display','flex'); 
      $('.foxTitle').css('display','inline');
      }

    else if ( responseJson.articles[i].source.name == "CNN" && cnnValue == 'cnn'){
      cnnHTML +=
       `${format}`;
      $('#cnn').html(`${cnnHTML}`);
      $('.cnnButtons').css('display','initial')
      $('#cnn').css('display','flex'); 
      $('.cnnTitle').css('display','inline'); 
      }
       
    else {
      elseHTML +=
      `${format}`;
      $('#else').html(`${elseHTML}`);
      $('#else').css('display','flex');
      $('.elseButtons').css('display','initial')
      $('.elseTitle').css('display','inline');
    }} 
  }

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
  $('.resultsTitle').css('display', 'inline')
  $('.bbcTitle, #bbc').css('display','none');
  $('.newYorkTimesTitle, #newYorkTimes').css('display','none'); 
  $('.elseTitle, #else').css('display','none');
  $('.foxTitle, #fox').css('display','none'); 
  $('.cnnTitle, #cnn').css('display','none');
  $('.elseButtons, .bbcButtons, .nytButtons, .foxButtons, .cnnButtons')
  .css('display','none');
  $('.results').empty();
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});
