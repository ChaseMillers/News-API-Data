
function buttonRight(event) {
  if(event.target.value === "bbc"){
  document.getElementById('bbc').scrollBy({
    left: 400,
    behavior: 'smooth' 
  }) }
  else if(event.target.value === "nyt"){
  document.getElementById('newYorkTimes').scrollBy({
    left: 400,
    behavior: 'smooth' 
  }) }
  else if(event.target.value === "fox"){
   document.getElementById('fox').scrollBy({
    left: 400,
    behavior: 'smooth' 
  }) }
  else if(event.target.value === "cnn"){
  document.getElementById('cnn').scrollBy({
    left: 400,
    behavior: 'smooth' 
  }) }
  else {
  document.getElementById('else').scrollBy({
    left: 400,
    behavior: 'smooth' 
  }) }
};

function buttonLeft(event) {
   if(event.target.value === "bbc"){
  document.getElementById('bbc').scrollBy({
    left: -400,
    behavior: 'smooth' 
  }) }
  else if(event.target.value === "nyt"){
  document.getElementById('newYorkTimes').scrollBy({
    left: -400,
    behavior: 'smooth' 
  }) }
  else if(event.target.value === "fox"){
   document.getElementById('fox').scrollBy({
    left: -400,
    behavior: 'smooth' 
  }) }
  else if(event.target.value === "cnn"){
  document.getElementById('cnn').scrollBy({
    left: -400,
    behavior: 'smooth' 
  }) }
  else {
  document.getElementById('else').scrollBy({
    left: -400,
    behavior: 'smooth' 
  }) }
};
