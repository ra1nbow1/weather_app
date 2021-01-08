var app = new Vue({
  el: '.container',
  data: {
    today: {
      dotw: '---',
      dotw_full: '------',
      day: '-',
      month: '-------',
      year: '-------',
      city: '--------',
      country: '--',
      icon: '---',
      temperature: '--',
      max_temperature: '--',
      description: '-----',

      humidity: '--',
      wind: {
        direction: '---',
        speed: '--'
      },
      pressure: '---',
      pop: '--'
    },

    today_backup: {
      dotw: '---',
      dotw_full: '------',
      day: '-',
      month: '-------',
      year: '-------',
      city: '--------',
      country: '--',
      icon: '---',
      temperature: '--',
      max_temperature: '--',
      description: '-----',

      humidity: '--',
      wind: {
        direction: '---',
        speed: '--'
      },
      pressure: '---',
      pop: '--'
    },
  
    nextDay: {
      dotw: '---',
      dotw_full: '------',
      day: '-',
      month: '-------',
      year: '-------',
      city: '--------',
      country: '--',
      icon: '---',
      temperature: '--',
      max_temperature: '--',
      description: '-----',

      humidity: '--',
      wind: {
        direction: '---',
        speed: '--'
      },
      pressure: '---',
      pop: '--'
    },

    next2Day: {
      dotw: '---',
      dotw_full: '------',
      day: '-',
      month: '-------',
      year: '-------',
      city: '--------',
      country: '--',
      icon: '---',
      temperature: '--',
      max_temperature: '--',
      description: '-----',

      humidity: '--',
      wind: {
        direction: '---',
        speed: '--'
      },
      pressure: '---',
      pop: '--'
    },

    next3Day: {
      dotw: '---',
      dotw_full: '------',
      day: '-',
      month: '-------',
      year: '-------',
      city: '--------',
      country: '--',
      icon: '---',
      temperature: '--',
      max_temperature: '--',
      description: '-----',

      humidity: '--',
      wind: {
        direction: '---',
        speed: '--'
      },
      pressure: '---',
      pop: '--'
    },

    next4Day: {
      dotw: '---',
      dotw_full: '------',
      day: '-',
      month: '-------',
      year: '-------',
      city: '--------',
      country: '--',
      icon: '---',
      temperature: '--',
      max_temperature: '--',
      description: '-----',

      humidity: '--',
      wind: {
        direction: '---',
        speed: '--'
      },
      pressure: '---',
      pop: '--'
    },
  },
  methods: {
    changeDay: function(number){
      $('li').removeClass('active') // убираем active у всех li
      $(`li:nth-child(${number})`).addClass('active') // присваиваем active к li, на который нажали
      $('.location-button').css('visibility', 'visible') // показываем кнопку

      // обработка нажания дня недели
      if (number == 1) { 
        this.today = this.nextDay
      }
      if (number == 2) {
        this.today = this.next2Day
      }
      if (number == 3) {
        this.today = this.next3Day
      }
      if (number == 4) {
        this.today = this.next4Day
      }

    },

    backup: function(){
      $('li').removeClass('active')
      this.today = this.today_backup;
      $('.location-button').css('visibility', 'hidden');
    }
  },
  async mounted() {
    async function returnCoordinates(){
var options = [ enableHighAccuracy = true ]
      function errorHandler(err) {
        while (err.code == 0) {
          $('.preloader').fadeIn()
          $('.container').fadeOut()
        }
            if(err.code == 1) {
               $('.container').remove()
               $('.preloader').fadeIn()
            } else if( err.code == 2) {
               alert("Error: Геопозиция не определена");
            }
         }

    return new Promise((res, rej)=>{
         navigator.geolocation.getCurrentPosition(
                function(position) {
                    let result = [];
                  this.latitude = position.coords.latitude;
                  this.longititude = position.coords.longitude;
                  latitude = parseFloat(latitude.toFixed(3))
                  longititude = parseFloat(longititude.toFixed(3))
                  result[0] = latitude;
                  result[1] = longititude;
                    res(result);
                }, errorHandler, options
              )
    })
}

        
        let result = await returnCoordinates();
        // console.log('Latitude: ', result[0], ' Longititude: ', result[1])
        axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${result[0]}&lon=${result[1]}&lang=ru&key=03704ace18e04304accfe4c756b40935&days=5`).then(res => {
        // console.log(res)  // логирование всего респонса (ответа)
        var info = res.data;
        var today = new Date(); // сегодняшняя дата
        var daysOfTheWeek = { // объекта для перевода дня недели из цифры в название. В JS Воскресенье - 0, Суббота - 6
            0: 'Воскресенье',
            1: 'Понедельник',
            2: 'Вторник',
            3: 'Среда',
            4: 'Четверг',
            5: 'Пятница',
            6: 'Суббота',
            7: 'Воскресенье',
            8: 'Понедельник',
            9: 'Вторник',
            10: 'Среда',
            11: 'Четверг',
            12: 'Пятница',
            13: 'Суббота',
            14: 'Воскресенье'
        }
        var shortdotw = { // сокращение дней недели
            0: 'Вс',
            1: 'Пн',
            2: 'Вт',
            3: 'Ср',
            4: 'Чт',
            5: 'Пт',
            6: 'Сб',
            7: 'Вс',
            8: 'Пн',
            9: 'Вт',
            10: 'Ср',
            11: 'Чт',
            12: 'Пт',
            13: 'Сб',
            14: 'Вс'
        }
        var weekNumber = today.getDay(); // получаем день недели 0-6
        var monthNumber = today.getMonth(); // число месяца 0-11
        var months = { // объект для перевода месяца из цифры в название
            0: 'Января',
            1: 'Февраля',
            2: 'Марта',
            3: 'Апреля',
            4: 'Мая',
            5: 'Июня',
            6: 'Июля',
            7: 'Августа',
            8: 'Сентября',
            9: 'Октября',
            10: 'Ноября',
            11: 'Декабря'
        }
        
        this.today.dotw = shortdotw[weekNumber]; // переводим текущий день из цифры в короткое название
        this.today.dotw_full = daysOfTheWeek[weekNumber] // переводим текущий день из цифры в полное название
        this.today.day = parseInt(info.data[0].valid_date.slice(8)) // получаем строку с датой ГГГГ-ММ-ДД, обрезаем ее, получаем день, переводим строку в число
        this.today.month = months[parseInt(info.data[0].valid_date.slice(5).slice(0,2))-1]; // выбираем из массива значение, индекс которго равен числовому значению обрезанной строки с датой - месяц
        this.today.year = parseInt(info.data[0].valid_date.slice(0,4)); // получаем строку с датой ГГГ-ММ-ДД, обрезаем ее, получаем год, переводим строку в число
        this.today.city = info.city_name; // получаем город
        this.today.country = info.country_code; // получаем сокращение страны
        this.today.icon = 'https://www.weatherbit.io/static/img/icons/' + info.data[0].weather.icon + '.png'; // собираем строку для пути картинки
        this.today.temperature = Math.round(info.data[0].temp); // получаем и округляем температуру
        this.today.max_temperature = Math.round(info.data[0].max_temp) // получаем и округляем максимальную температуру
        this.today.description = info.data[0].weather.description; // получаем погодные условия
        this.today.humidity = info.data[0].rh; // получаем влажность
        this.today.wind.speed = Math.round(info.data[0].wind_spd); // получаем скорость ветра
        this.today.wind.direction = info.data[0].wind_cdir; // получаем направление ветра
        this.today.pressure = Math.round(info.data[0].pres * 0.75006); // получаем давление, переводим в мм рт.с.
        this.today.pop = info.data[0].pop; // получаем вероятность осадков
        // console.log('TODAY', this.today)

        this.today_backup = this.today; // создаем копию объекта, чтобы была возможность вернуться к сегодняшним данным
        // console.log('TODAYBACKUP', this.today_backup)

        this.nextDay.dotw = shortdotw[weekNumber+1];
        this.nextDay.dotw_full = daysOfTheWeek[weekNumber+1];
        this.nextDay.day = parseInt(info.data[1].valid_date.slice(8));
        this.nextDay.month = months[parseInt(info.data[1].valid_date.slice(5).slice(0,2))-1];
        this.nextDay.year = parseInt(info.data[1].valid_date.slice(0,4));
        this.nextDay.city = info.city_name;
        this.nextDay.country = info.country_code;
        this.nextDay.icon = 'https://www.weatherbit.io/static/img/icons/' + info.data[1].weather.icon + '.png';
        this.nextDay.temperature = Math.round(info.data[1].temp);
        this.nextDay.max_temperature = Math.round(info.data[1].max_temp);
        this.nextDay.description = info.data[1].weather.description;
        this.nextDay.humidity = info.data[1].rh;
        this.nextDay.wind.speed = Math.round(info.data[1].wind_spd);
        this.nextDay.wind.direction = info.data[1].wind_cdir;
        this.nextDay.pressure = Math.round(info.data[1].pres * 0.75006);
        this.nextDay.pop = info.data[1].pop;
        // console.log('NEXTDAY', this.nextDay)

        this.next2Day.dotw = shortdotw[weekNumber+2];
        this.next2Day.dotw_full = daysOfTheWeek[weekNumber+2];
        this.next2Day.day = parseInt(info.data[2].valid_date.slice(8));
        this.next2Day.month = months[parseInt(info.data[2].valid_date.slice(5).slice(0,2))-1];
        this.next2Day.year = parseInt(info.data[2].valid_date.slice(0,4));
        this.next2Day.city = info.city_name;
        this.next2Day.country = info.country_code;
        this.next2Day.icon = 'https://www.weatherbit.io/static/img/icons/' + info.data[2].weather.icon + '.png';
        this.next2Day.temperature = Math.round(info.data[2].temp);
        this.next2Day.max_temperature = Math.round(info.data[2].max_temp);
        this.next2Day.description = info.data[2].weather.description;
        this.next2Day.humidity = info.data[2].rh;
        this.next2Day.wind.speed = Math.round(info.data[2].wind_spd);
        this.next2Day.wind.direction = info.data[2].wind_cdir;
        this.next2Day.pressure = Math.round(info.data[2].pres * 0.75006);
        this.next2Day.pop = info.data[2].pop;
        // console.log('NEXT2DAY', this.next2Day)

        this.next3Day.dotw = shortdotw[weekNumber+3];
        this.next3Day.dotw_full = daysOfTheWeek[weekNumber+3];
        this.next3Day.day = parseInt(info.data[3].valid_date.slice(8));
        this.next3Day.month = months[parseInt(info.data[3].valid_date.slice(5).slice(0,2))-1];
        this.next3Day.year = parseInt(info.data[3].valid_date.slice(0,4));
        this.next3Day.city = info.city_name;
        this.next3Day.country = info.country_code;
        this.next3Day.icon = 'https://www.weatherbit.io/static/img/icons/' + info.data[3].weather.icon + '.png';
        this.next3Day.temperature = Math.round(info.data[3].temp);
        this.next3Day.max_temperature = Math.round(info.data[3].max_temp);
        this.next3Day.description = info.data[3].weather.description;
        this.next3Day.humidity = info.data[3].rh;
        this.next3Day.wind.speed = Math.round(info.data[2].wind_spd);
        this.next3Day.wind.direction = info.data[3].wind_cdir;
        this.next3Day.pressure = Math.round(info.data[3].pres * 0.75006);
        this.next3Day.pop = info.data[3].pop;
        // console.log('NEXT3DAY', this.next3Day)

        this.next4Day.dotw = shortdotw[weekNumber+4];
        this.next4Day.dotw_full = daysOfTheWeek[weekNumber+4];
        this.next4Day.day = parseInt(info.data[4].valid_date.slice(8));
        this.next4Day.month = months[parseInt(info.data[4].valid_date.slice(5).slice(0,2))-1];
        this.next4Day.year = parseInt(info.data[4].valid_date.slice(0,4));
        this.next4Day.city = info.city_name;
        this.next4Day.country = info.country_code;
        this.next4Day.icon = 'https://www.weatherbit.io/static/img/icons/' + info.data[4].weather.icon + '.png';
        this.next4Day.temperature = Math.round(info.data[4].temp);
        this.next4Day.max_temperature = Math.round(info.data[4].max_temp);
        this.next4Day.description = info.data[4].weather.description;
        this.next4Day.humidity = info.data[4].rh;
        this.next4Day.wind.speed = Math.round(info.data[2].wind_spd);
        this.next4Day.wind.direction = info.data[4].wind_cdir;
        this.next4Day.pressure = Math.round(info.data[4].pres * 0.75006);
        this.next4Day.pop = info.data[4].pop;
        // console.log('NEXT4DAY', this.next4Day)
        
        
      })
  }
})

$(document).ready(function() {
    function hidePreloader() {
      var preloader = $('.preloader')
      setTimeout( function(){
        $('.container').css('visibility', 'visible')
      }, 1000)
      preloader.fadeOut(1000)
    }
    hidePreloader();
    });
