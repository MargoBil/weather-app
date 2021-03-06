import '../styles/styles.scss';
import './../../node_modules/preloader-js/assets/css/preloader.css';
import Chart from 'chart.js';
import generatorBackgroundPictures
  from './background-pictures/make-background-pictures';
import templateOfOneDayTempr from './../templates/one-day-tempr.hbs';
import currentTime from './../templates/curren-time.hbs';
import sunrise from './../templates/sunrise.hbs';
import sunset from './../templates/sunset.hbs';
import itemWeatherByFiveDays from './../templates/item-weather-five-days.hbs';
import boxOfFiveDaysName from './../templates/box-five-days.hbs';
import itemOfTemprRange from './../templates/item-tempr-range.hbs';
import month from './../data/month';
import monthShort from './../data/monthShort';
import arrWeekDay from './../data/week';
import days from './../data/week-day';
import guotesArr from './../data/quotes';
import preloader from './../../node_modules/preloader-js/preloader';
import renderCurrentTime from './time/render-time';
import weatherInfoFiveDays from './weather-five-days/create-weather-obj';

const preloaderBox = document.querySelector ('.preloader');

preloaderBox.style.backgroundColor = '#808080';

preloader.show ();

const key = '2647a458f645f572ecd71117c7dde2a8';
let cityName;

const refs = {
  mainInput: document.querySelector ('.input-box__input'),
  mainInputForm: document.querySelector ('.input-box'),
  body: document.querySelector ('body'),
  oneDayTempr: document.querySelector ('.current-temperature-today'),
  currentInformationDayDate: document.querySelector (
    '.current-information-today__date-today'
  ),
  currentInformationSunrise: document.querySelector (
    '.current-information-today__value-sunrise'
  ),
  currentInformationSunset: document.querySelector (
    '.current-information-today__value-sunset'
  ),
  currentInformationDay: document.querySelector ('.current-information-today'),
  btnFiveDays: document.querySelector ('.buttons-box__five-days'),
  btnBox: document.querySelector ('.buttons-box'),
  quotes: document.querySelector ('.quotes'),
  btnOneDays: document.querySelector ('.buttons-box__one-day'),
  listOfWeatherFiveDays: document.querySelector (
    '.current-information-five-days__list-days'
  ),
  nameBoxFiveDays: document.querySelector (
    '.current-information-five-days__name-box'
  ),
  listFiveDaysTemprRange: document.querySelector (
    '.current-information-five-days__list-temperature'
  ),
  boxCurrentInformFiveDays: document.querySelector (
    '.current-information-five-days'
  ),
  boxItemsTemperRange: document.querySelector (
    '.current-information-five-days__temperature-range'
  ),
  btnBoxTemprRangeClose: document.querySelector (
    '.current-information-five-days__btn-box-close'
  ),
  btnOfListTemprFiveDaysPrev: document.querySelector (
    '.current-information-five-days__btn-prev'
  ),
  btnOfListTemprFiveDaysNext: document.querySelector (
    '.current-information-five-days__btn-next'
  ),
  btnOfListTemprRangeNext: document.querySelector (
    '.current-information-five-days__temperature-btn-tempr-next'
  ),
  btnOfListTemprRangePrev: document.querySelector (
    '.current-information-five-days__temperature-btn-tempr-prev'
  ),
  quotesText: document.querySelector ('.quotes__text'),
  quotesAothor: document.querySelector ('.quotes__author'),
  ctx: document.getElementById ('myChart'),
  btnShowChart: document.querySelector (
    '.current-information-five-days__chart-btn'
  ),
  btnShowChartLink: document.querySelector (
    '.current-information-five-days__chart-btn-link'
  ),
  boxOfCanvas: document.querySelector (
    '.current-information-five-days__chart-canvas'
  ),
};

getNewBackground ();

renderWeather ('Киев', key);

renderCurrentTime (month, days, currentTime, refs.currentInformationDayDate);

renderQuotes (guotesArr);

refs.mainInputForm.addEventListener ('submit', handlerMainInputSearch);

refs.btnFiveDays.addEventListener ('click', handlerBtnOfFiveDays);

refs.btnOneDays.addEventListener ('click', handlerBtnOfOneDays);

refs.listOfWeatherFiveDays.addEventListener (
  'click',
  handlerClickOnItemsOfFiveDays
);

refs.btnBoxTemprRangeClose.addEventListener (
  'click',
  hanblerClickOfBtnTemprRangeClose
);

refs.btnOfListTemprFiveDaysNext.addEventListener (
  'click',
  handlerClickOfBtnListTemprFiveDaysNext
);

refs.btnOfListTemprFiveDaysPrev.addEventListener (
  'click',
  handlerClickOfBtnListTemprFiveDaysPrev
);

refs.btnOfListTemprRangeNext.addEventListener (
  'click',
  handlerClickOfBtnListTemprRangeNext
);

refs.btnShowChart.addEventListener ('click', handlerClickOfBtnShowChart);

function handlerClickOfBtnShowChart (event) {
  event.preventDefault ();
  refs.boxOfCanvas.classList.toggle ('display-none-js');
  if (refs.boxOfCanvas.classList.contains ('display-none-js')) {
    event.target.textContent = 'Show Chart';
  } else {
    event.target.textContent = 'Hide Chart';
  }
}

function renderQuotes (arr) {
  let i = Math.round (Math.random () * (arr.length - 1 - 0) + 0);
  refs.quotesText.textContent = arr[i].quote;
  refs.quotesAothor.textContent = arr[i].author;
  setInterval (() => {
    i = Math.round (Math.random () * (arr.length - 1 - 0) + 0);
    refs.quotesText.textContent = arr[i].quote;
    refs.quotesAothor.textContent = arr[i].author;
  }, 3000);
}

function handlerClickOfBtnListTemprRangePrev (event) {
  const listOfVisibleItems = refs.listFiveDaysTemprRange.getElementsByClassName (
    'visible-js'
  );
  const listOfItemsTemprRange = refs.listFiveDaysTemprRange.querySelectorAll (
    'li'
  );
  if (listOfItemsTemprRange.length < 3) {
    return;
  } else {
    if (listOfVisibleItems[0].previousElementSibling === null) {
      return;
    } else {
      let count = 0;
      listOfVisibleItems.forEach (item => {
        count = count + 130;
        item.style.transform = `translateX(${count}px)`;
      });
      listOfVisibleItems[0].previousElementSibling.classList.add ('visible-js');
      listOfVisibleItems[0].style.transform = 'translateX(0px)';
    }
  }
}

function handlerClickOfBtnListTemprRangeNext (event) {
  refs.btnOfListTemprRangePrev.addEventListener (
    'click',
    handlerClickOfBtnListTemprRangePrev
  );
  const listOfItemsTemprRange = refs.listFiveDaysTemprRange.querySelectorAll (
    'li'
  );
  if (listOfItemsTemprRange.length < 3) {
    return;
  } else {
    const listOfVisibleItems = refs.listFiveDaysTemprRange.getElementsByClassName (
      'visible-js'
    );
    if (listOfVisibleItems.length === 0) {
      for (let i = 0; i < 6; i++) {
        listOfItemsTemprRange[i].classList.add ('visible-js');
      }
    }
    if (listOfVisibleItems.length === 2) {
      return;
    } else {
      let count = -260;
      listOfVisibleItems.forEach (item => {
        count = count + 130;
        item.style.transform = `translateX(${count}px)`;
      });
      listOfVisibleItems[0].classList.remove ('visible-js');
      if (
        listOfVisibleItems[listOfVisibleItems.length - 1].nextElementSibling ===
        null
      ) {
        return;
      } else {
        listOfVisibleItems[
          listOfVisibleItems.length - 1
        ].nextElementSibling.classList.add ('visible-js');
      }
    }
  }
}

function handlerClickOfBtnListTemprFiveDaysPrev (event) {
  const listOfVisibleItems = refs.listOfWeatherFiveDays.getElementsByClassName (
    'visible-js'
  );
  if (listOfVisibleItems[0].previousElementSibling === null) {
    return;
  } else {
    listOfVisibleItems[0].style.transform = 'translateX(73px)';
    listOfVisibleItems[1].style.transform = 'translateX(146px)';
    listOfVisibleItems[2].style.transform = 'translateX(219px)';
    listOfVisibleItems[2].classList.remove ('visible-js');
    listOfVisibleItems[0].previousElementSibling.style.transform =
      'translateX(0px)';
    listOfVisibleItems[0].previousElementSibling.classList.add ('visible-js');
  }
}

function handlerClickOfBtnListTemprFiveDaysNext (event) {
  const listOfVisibleItems = refs.listOfWeatherFiveDays.getElementsByClassName (
    'visible-js'
  );
  if (listOfVisibleItems[2].nextElementSibling === null) {
    return;
  } else {
    listOfVisibleItems[0].style.transform = 'translateX(-73px)';
    listOfVisibleItems[0].classList.remove ('visible-js');
    listOfVisibleItems[0].style.transform = 'translateX(0px)';
    listOfVisibleItems[1].style.transform = 'translateX(73px)';
    listOfVisibleItems[1].nextElementSibling.style.transform =
      'translateX(146px)';
    listOfVisibleItems[1].nextElementSibling.classList.add ('visible-js');
  }
}

function hanblerClickOfBtnTemprRangeClose (event) {
  event.preventDefault ();
  refs.boxItemsTemperRange.classList.add ('display-none-js');
}

function handlerClickOnItemsOfFiveDays (event) {
  if (event.target.tagName === 'A') {
    event.preventDefault ();
    getWeatherFiveDays (cityName, key)
      .then (data => {
        const idx = event.target.id;
        const weatherListOfDays = data.list;
        const listOfWeatherDays = weatherListOfDays.map (item => {
          return item.dt_txt.split (' ')[0];
        });
        const filteredListOfDays = Array.from (new Set (listOfWeatherDays));
        let arrOfWeatherByTime = [];
        for (let i = 0; i < filteredListOfDays.length; i++) {
          let filteredDataByDate = weatherListOfDays.filter (list => {
            return list.dt_txt.split (' ')[0] === filteredListOfDays[i];
          });
          arrOfWeatherByTime.push (filteredDataByDate);
        }
        const currentData = arrOfWeatherByTime[idx];
        const objOfTemprRange = currentData.map (item => {
          return {
            time: item.dt_txt
              .split (' ')[1]
              .split (':')
              .splice (0, 2)
              .join (':'),
            icon: item.weather[0].icon,
            mainTempr: Math.round (Number (item.main.temp)),
            pressure: item.main.pressure,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed,
          };
        });
        const markupItemTemprOfFiveDays = objOfTemprRange.map (item =>
          itemOfTemprRange (item)
        );
        refs.listFiveDaysTemprRange.innerHTML = markupItemTemprOfFiveDays.join (
          ''
        );
      })
      .then (() => {
        refs.boxItemsTemperRange.classList.remove ('display-none-js');
      });
  } else return;
}

function handlerBtnOfFiveDays (event) {
  cityName = refs.oneDayTempr.children[1].textContent.split (',')[0];
  getWeatherFiveDays (cityName, key)
    .then (data => {
      const weatherListOfDays = data.list;
      const listOfWeatherDays = weatherListOfDays.map (item => {
        return item.dt_txt.split (' ')[0];
      });
      const filteredListOfDays = Array.from (new Set (listOfWeatherDays));
      let arrOfWeatherByTime = [];
      for (let i = 0; i < filteredListOfDays.length; i++) {
        let filteredDataByDate = weatherListOfDays.filter (list => {
          return list.dt_txt.split (' ')[0] === filteredListOfDays[i];
        });
        arrOfWeatherByTime.push (filteredDataByDate);
      }
      const weatherInfoByEveryDay = weatherInfoFiveDays (
        data,
        arrOfWeatherByTime,
        arrWeekDay,
        month
      );
      const markupFiveDays = itemWeatherByFiveDays (weatherInfoByEveryDay);
      const nameOfBoxFiveDays = boxOfFiveDaysName (weatherInfoByEveryDay);
      refs.listOfWeatherFiveDays.innerHTML = markupFiveDays;
      refs.nameBoxFiveDays.innerHTML = nameOfBoxFiveDays;
      const arrOfTemprForChart = [];
      const arrOfHumidityForChart = [];
      const arrOfWindSpeedForChart = [];
      const arrOfPressureForChart = [];
      const arrOfDateForChart = [];
      const arrOfDate = filteredListOfDays.map (item => {
        return item.split ('-');
      });
      arrOfDate.forEach (item => {
        const monthChart = monthShort[Number (item[1]) - 1];
        const arrOfMonthName = `${monthChart} ${item[2]}, ${item[0]}`;
        arrOfDateForChart.push (arrOfMonthName);
      });
      arrOfWeatherByTime.forEach (items => {
        const temprForChart = items.reduce ((acc, item) => {
          const sum = acc + item.main.temp;
          return Math.round (sum);
        }, 0);
        arrOfTemprForChart.push (Math.round (temprForChart / items.length));
      });
      arrOfWeatherByTime.forEach (items => {
        const sum = items.reduce ((acc, item) => {
          return acc + item.main.humidity;
        }, 0);
        arrOfHumidityForChart.push (Math.round (sum / items.length));
      });
      arrOfWeatherByTime.forEach (items => {
        const sum = items.reduce ((acc, item) => {
          return acc + item.wind.speed;
        }, 0);
        arrOfWindSpeedForChart.push (Math.round (sum / items.length));
      });
      arrOfWeatherByTime.forEach (items => {
        const sum = items.reduce ((acc, item) => {
          return acc + item.main.pressure;
        }, 0);
        arrOfPressureForChart.push (Math.round (sum / items.length));
      });
      const myLineChart = new Chart (refs.ctx, {
        type: 'line',
        data: {
          labels: [...arrOfDateForChart],
          datasets: [
            {
              label: 'Temperature, C°',
              data: [...arrOfTemprForChart],
              borderColor: '#ff6b08',
              pointBackgroundColor: '#ff6b08',
              fill: false,
              lineTension: 0,
            },
            {
              label: 'Humidity, %',
              data: [...arrOfHumidityForChart],
              borderColor: '#0906ea',
              pointBackgroundColor: '#0906ea',
              fill: false,
              lineTension: 0,
            },
            {
              label: 'Wind Speed, m/s',
              data: [...arrOfWindSpeedForChart],
              borderColor: '#eb9b05',
              pointBackgroundColor: '#eb9b05',
              fill: false,
              lineTension: 0,
            },
            {
              label: 'Atmosphere Pressure, m/m',
              data: [...arrOfPressureForChart],
              borderColor: '#057806',
              pointBackgroundColor: '#057806',
              fill: false,
              lineTension: 0,
            },
          ],
        },
        options: {
          legend: {
            display: true,
            labels: {
              fontColor: '#b1b8c2',
            },
          },
          responsive: false,
        },
      });
    })
    .then (() => {
      refs.boxOfCanvas.classList.add ('display-none-js');
      refs.btnShowChart.children[0].textContent = 'Show Chart';
      refs.btnShowChart.classList.remove ('display-none-js');
      refs.btnShowChartLink.classList.remove ('display-none-js');
      refs.oneDayTempr.classList.add ('display-opasity-js');
      event.target.classList.add ('click-btn-js');
      refs.btnOneDays.classList.remove ('click-btn-js');
      refs.currentInformationDay.classList.add ('display-none-js');
      refs.quotes.classList.add ('display-none-js');
      refs.boxCurrentInformFiveDays.classList.remove ('display-none-js');
    });
}

function handlerBtnOfOneDays (event) {
  event.target.classList.add ('click-btn-js');
  refs.btnFiveDays.classList.remove ('click-btn-js');
  refs.oneDayTempr.classList.remove ('display-opasity-js');
  refs.currentInformationDay.classList.remove ('display-none-js');
  refs.quotes.classList.remove ('display-none-js');
  refs.boxCurrentInformFiveDays.classList.add ('display-none-js');
  refs.boxItemsTemperRange.classList.add ('display-none-js');
  refs.boxOfCanvas.classList.add ('display-none-js');
  refs.btnShowChart.classList.add ('display-none-js');
  refs.btnShowChartLink.classList.add ('display-none-js');
}

function renderWeather (cityName, key) {
  getWeather (cityName, key)
    .then (data => {
      const objectTempr = {
        nameCity: data.name,
        nameCountry: data.sys.country,
        mainTemp: Math.round (data.main.temp),
        maxTemp: Math.round (data.main.temp_max),
        minTemp: Math.round (data.main.temp_min),
        icon: data.weather[0].icon,
        sunriseHours: String (
          new Date (data.sys.sunrise * 1000).getHours ()
        ).padStart (2, '0'),
        sunriseMinutes: String (
          new Date (data.sys.sunrise * 1000).getMinutes ()
        ).padStart (2, '0'),
        sunsetHours: String (
          new Date (data.sys.sunset * 1000).getHours ()
        ).padStart (2, '0'),
        sunsetMinutes: String (
          new Date (data.sys.sunset * 1000).getMinutes ()
        ).padStart (2, '0'),
      };
      return objectTempr;
    })
    .then (obj => {
      const markupOneDayTempr = templateOfOneDayTempr (obj);
      refs.oneDayTempr.innerHTML = markupOneDayTempr;
      const markupSunrise = sunrise (obj);
      const markupSunset = sunset (obj);
      refs.currentInformationSunrise.innerHTML = markupSunrise;
      refs.currentInformationSunset.innerHTML = markupSunset;
    })
    .finally (() => {
      setTimeout (() => preloader.hide (), 1000);
    });
}

async function getWeather (cityName, key) {
  try {
    const response = await fetch (
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${key}&lang=	ua`
    );
    if (response.ok) {
      const data = await response.json ();
      return data;
    }
  } catch (error) {
    throw error;
  }
}

async function getWeatherFiveDays (cityName, key) {
  try {
    const response = await fetch (
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${key}&lang=ua`
    );
    if (response.ok) {
      const data = await response.json ();
      return data;
    }
  } catch (error) {
    throw error;
  }
}

function handlerMainInputSearch (event) {
  event.preventDefault ();
  preloader.show ();
  cityName = event.target[0].value;
  getDefaultStyle ();
  event.target[0].value = cityName[0].toUpperCase () + cityName.slice (1);
  renderWeather (cityName, key);
  getNewBackground ();
}

function getDefaultStyle () {
  refs.btnOneDays.classList.add ('click-btn-js');
  refs.boxOfCanvas.classList.add ('display-none-js');
  refs.btnFiveDays.classList.remove ('click-btn-js');
  refs.oneDayTempr.classList.remove ('display-opasity-js');
  refs.currentInformationDay.classList.remove ('display-none-js');
  refs.quotes.classList.remove ('display-none-js');
  refs.boxCurrentInformFiveDays.classList.add ('display-none-js');
  refs.boxItemsTemperRange.classList.add ('display-none-js');
  refs.btnShowChart.classList.add ('display-none-js');
  refs.btnShowChartLink.classList.add ('display-none-js');
}

function getNewBackground () {
  const idx = Math.round (Math.random () * (10 - 0) + 0);
  generatorBackgroundPictures ()
    .then (data => {
      refs.body.style.backgroundImage = `url('${data.hits[idx].largeImageURL}')`;
    })
    .catch (error => error);
}
