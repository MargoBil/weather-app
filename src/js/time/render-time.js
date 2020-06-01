export default  function (month, days, currentTime, element) {
    setInterval (() => {
      const date = new Date ();
      const currentDate = {
        dateMonth: date.getDate (),
        nameMonth: month[date.getMonth ()],
        numberWeek: days[date.getDay ()],
        hours: String (date.getHours ()).padStart (2, '0'),
        minutes: String (date.getMinutes ()).padStart (2, '0'),
        seconds: String (date.getSeconds ()).padStart (2, '0'),
      };
      const markupCurrentTime = currentTime (currentDate);
     element.innerHTML = markupCurrentTime;
    }, 1000);
  }