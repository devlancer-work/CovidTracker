const input = document.getElementById('search');
const select = document.getElementById('allCountries');
const submit = document.querySelector('.submit');
const loader = document.getElementById('loading');
const date = document.querySelector('.date');
const main = document.getElementById('main');


window.addEventListener('DOMContentLoaded', fetchApi());


let countriesArray = [];

// fetch Api
function fetchApi() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.covid19api.com/summary", true);
  xhr.onload = function(){
    if(this.readyState = 200){
      var res = JSON.parse(this.responseText);
      loadCountries(res);
    }else{
      console.log("Error Occured");
    }
  }

  xhr.send();
}

// Load Countries
function loadCountries(value) {
  var countriesData = value.Countries;
  for(let i=0; i<countriesData.length; i++){
    countriesArray[i] = countriesData[i].Country;
  }


  for(let i=0; i<countriesArray.length; i++){
    select.innerHTML += `<option value="${countriesArray[i]}">${countriesArray[i]}</option>`;
  }


  select.addEventListener('change', function(){
    var countryName = select.value;
    for(let i=0; i<countriesData.length; i++){
      if(countriesData[i].Country === countryName){
        applyData(countriesData[i]);
      }
    }
    main.classList.add('hidden');
  });

  showGlobalData(value);
  showDataDate(value);
}

// Show Data Date

function showDataDate(data) {
  var dataDate = data.Date;
  dataDate = dataDate.slice(0, 10);
  date.textContent = dataDate;
}

// Show Global Data 

function showGlobalData(data){
  dataGlobal = data.Global;
  applyData(dataGlobal);
}

// apply Data

function applyData(value){

    loader.classList.remove('hidden');

    setTimeout(() => {
      main.classList.remove('hidden');
      loader.classList.add('hidden');
    }, 500);
  
  if(value.Country){
    document.querySelector('.country__getData').textContent = value.Country;
    document.querySelector('.totalCases__getData').textContent = value.TotalConfirmed;
    document.querySelector('.newCases__getData').textContent = value.NewConfirmed;
    document.querySelector('.totalRecovered__getData').textContent = value.TotalRecovered;
    document.querySelector('.newRecovered__getData').textContent = value.NewRecovered;
    document.querySelector('.totalDeaths__getData').textContent = value.TotalDeaths;
    document.querySelector('.newDeaths__getData').textContent = value.NewDeaths;
  }else {
    document.querySelector('.totalCases__getData').textContent = value.TotalConfirmed;
    document.querySelector('.newCases__getData').textContent = value.NewConfirmed;
    document.querySelector('.totalRecovered__getData').textContent = value.TotalRecovered;
    document.querySelector('.newRecovered__getData').textContent = value.NewRecovered;
    document.querySelector('.totalDeaths__getData').textContent = value.TotalDeaths;
    document.querySelector('.newDeaths__getData').textContent = value.NewDeaths;
  }
}


