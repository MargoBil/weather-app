export default function (data, arrOfWeatherByTime, arrWeekDay, month) {
  const weatherInfoByEveryDay = {
    nameCity: data.city.name,
    country: data.city.country,
    currentDayNameOfWeek: arrWeekDay[
      new Date (Date.parse (arrOfWeatherByTime[0][0].dt_txt)).getDay ()
    ],
    currentDayIcon: arrOfWeatherByTime[0][0].weather[0].icon,
    currentDayMinTempr: String (
      Math.round (
        Math.min (
          ...arrOfWeatherByTime[0].map (item => {
            return item.main.temp_min * 100;
          })
        ) / 100
      )
    ).padStart (2, '0'),
    currentDayMaxTempr: String (
      Math.round (
        Math.max (
          ...arrOfWeatherByTime[0].map (item => {
            return item.main.temp_max * 100;
          })
        ) / 100
      )
    ).padStart (2, '0'),
    currentDayNameOfMonth: month[
      new Date (Date.parse (arrOfWeatherByTime[0][0].dt_txt)).getMonth ()
    ],
    currentDayNameOfDay: new Date (
      Date.parse (arrOfWeatherByTime[0][0].dt_txt)
    ).getDate (),
    dayOneNameOfWeek: arrWeekDay[
      new Date (Date.parse (arrOfWeatherByTime[1][0].dt_txt)).getDay ()
    ],
    dayOneIcon: arrOfWeatherByTime[1][0].weather[0].icon,
    dayOneMinTempr: String (
      Math.round (
        Math.min (
          ...arrOfWeatherByTime[1].map (item => {
            return item.main.temp_min * 100;
          })
        ) / 100
      )
    ).padStart (2, '0'),
    dayOneMaxTempr: String (
      Math.round (
        Math.max (
          ...arrOfWeatherByTime[1].map (item => {
            return item.main.temp_max * 100;
          })
        ) / 100
      )
    ).padStart (2, '0'),
    dayOneNameOfMonth: month[
      new Date (Date.parse (arrOfWeatherByTime[1][0].dt_txt)).getMonth ()
    ],
    dayOneNameOfDay: new Date (
      Date.parse (arrOfWeatherByTime[1][0].dt_txt)
    ).getDate (),
    dayTwoNameOfWeek: arrWeekDay[
      new Date (Date.parse (arrOfWeatherByTime[2][0].dt_txt)).getDay ()
    ],
    dayTwoIcon: arrOfWeatherByTime[2][0].weather[0].icon,
    dayTwoMinTempr: String (
      Math.round (
        Math.min (
          ...arrOfWeatherByTime[2].map (item => {
            return item.main.temp_min * 100;
          })
        ) / 100
      )
    ).padStart (2, '0'),
    dayTwoMaxTempr: String (
      Math.round (
        Math.max (
          ...arrOfWeatherByTime[2].map (item => {
            return item.main.temp_max * 100;
          })
        ) / 100
      )
    ).padStart (2, '0'),
    dayTwoNameOfMonth: month[
      new Date (Date.parse (arrOfWeatherByTime[2][0].dt_txt)).getMonth ()
    ],
    dayTwoNameOfDay: new Date (
      Date.parse (arrOfWeatherByTime[2][0].dt_txt)
    ).getDate (),
    dayThreeNameOfWeek: arrWeekDay[
      new Date (Date.parse (arrOfWeatherByTime[3][0].dt_txt)).getDay ()
    ],
    dayThreeIcon: arrOfWeatherByTime[3][0].weather[0].icon,
    dayThreeMinTempr: String (
      Math.round (
        Math.min (
          ...arrOfWeatherByTime[3].map (item => {
            return item.main.temp_min * 100;
          })
        ) / 100
      )
    ).padStart (2, '0'),
    dayThreeMaxTempr: String (
      Math.round (
        Math.max (
          ...arrOfWeatherByTime[3].map (item => {
            return item.main.temp_max * 100;
          })
        ) / 100
      )
    ).padStart (2, '0'),
    dayThreeNameOfMonth: month[
      new Date (Date.parse (arrOfWeatherByTime[3][0].dt_txt)).getMonth ()
    ],
    dayThreeNameOfDay: new Date (
      Date.parse (arrOfWeatherByTime[3][0].dt_txt)
    ).getDate (),
    dayFourNameOfWeek: arrWeekDay[
      new Date (Date.parse (arrOfWeatherByTime[4][0].dt_txt)).getDay ()
    ],
    dayFourIcon: arrOfWeatherByTime[4][0].weather[0].icon,
    dayFourMinTempr: String (
      Math.round (
        Math.min (
          ...arrOfWeatherByTime[4].map (item => {
            return item.main.temp_min * 100;
          })
        ) / 100
      )
    ).padStart (2, '0'),
    dayFourMaxTempr: String (
      Math.round (
        Math.max (
          ...arrOfWeatherByTime[4].map (item => {
            return item.main.temp_max * 100;
          })
        ) / 100
      )
    ).padStart (2, '0'),
    dayFourNameOfMonth: month[
      new Date (Date.parse (arrOfWeatherByTime[4][0].dt_txt)).getMonth ()
    ],
    dayFourNameOfDay: new Date (
      Date.parse (arrOfWeatherByTime[4][0].dt_txt)
    ).getDate (),
    dayFiveNameOfWeek: arrWeekDay[
      new Date (Date.parse (arrOfWeatherByTime[5][0].dt_txt)).getDay ()
    ],
    dayFiveIcon: arrOfWeatherByTime[5][0].weather[0].icon,
    dayFiveMinTempr: String (
      Math.round (
        Math.min (
          ...arrOfWeatherByTime[5].map (item => {
            return item.main.temp_min * 100;
          })
        ) / 100
      )
    ).padStart (2, '0'),
    dayFiveMaxTempr: String (
      Math.round (
        Math.max (
          ...arrOfWeatherByTime[5].map (item => {
            return item.main.temp_max * 100;
          })
        ) / 100
      )
    ).padStart (2, '0'),
    dayFiveNameOfMonth: month[
      new Date (Date.parse (arrOfWeatherByTime[5][0].dt_txt)).getMonth ()
    ],
    dayFiveNameOfDay: new Date (
      Date.parse (arrOfWeatherByTime[5][0].dt_txt)
    ).getDate (),
  };
   return weatherInfoByEveryDay;
}