 document.addEventListener('DOMContentLoaded', function() {
   // конечная дата
   const timerData = document.querySelector('.timer__wrap').getAttribute('data-time');

   const [day, month, year, hours, minutes] = timerData.replace(/[:.]/g, ' ').split(' ');

   const deadline = new Date(year, month-1, day, hours, minutes);
   // id таймера
   let timerId = null;
   // склонение числительных
   function declensionNum(num, words) {
     return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
   }
   // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
   function countdownTimer() {
     const diff = deadline - new Date();
     if (diff <= 0) {
       clearInterval(timerId);
     }
     const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
     const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
     const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
     const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
     $days.textContent = days < 10 ? '0' + days : days;
     $hours.textContent = hours < 10 ? '0' + hours : hours;
     $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
     $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
     $days.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
     $hours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
     $minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
     $seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
   }
   // получаем элементы, содержащие компоненты даты
   const $days = document.querySelector('.timer__days');
   const $hours = document.querySelector('.timer__hours');
   const $minutes = document.querySelector('.timer__minutes');
   const $seconds = document.querySelector('.timer__seconds');
   // вызываем функцию countdownTimer
   countdownTimer();
   // вызываем функцию countdownTimer каждую секунду
   timerId = setInterval(countdownTimer, 1000);
 });


/*
$(document).ready(function() {



    (function () {
    
    if($('.select__wrap').length>0) {
      $('.select__wrap').each(function () {
          var placeholder = $(this).find('.select__placeholder').html();
          if(placeholder == '') {
              checkActive(this);
              placeholder = $(this).find('.select__placeholder').html();
          }
      });

      $('.select__wrap').on('click', function (e) {
          if ($(e.target).is('.select__disabled') || $(e.target).closest('.select__list').length) {
              return false;
          }
          
          let $select__wrap = $(this);

          if(!$select__wrap.hasClass('select__wrap--active')) {
            if($select__wrap.hasClass('select__wrap--end-active')) {
            // предотвращение дребезга
            // меню ещё закрывается
            return
            }
              showSelectList($select__wrap)
          } else {
              hideSelectList($select__wrap)
          }
          
      });

      $('.select__wrap').on('click', '.select__item', function (e) {
          if ($(e.target).is('.select__item--disabled')) {
              return false;
          } else if ($(e.target).is(".select__item")) {
              let $select__wrap = $(this).parents('.select__wrap')
              let $select__item = $(this)

              $select__wrap.find('.select__item--active').removeClass('select__item--active')
              $select__item.addClass('select__item--active');
              setPlaceholder(this);

              hideSelectList($select__wrap)
               e.stopPropagation();
          } 

      });

      $('.select__wrap--single').on('click', '.select__item', function (e) {
       var index = $(this).index();
        $(".single__tem").removeClass("single__item--active").eq($(this).index()).addClass("single__item--active");
        
         $(".single__box").hide().eq(index).fadeIn();
         let elemPlaceholder = $('.select__wrap--single .select__placeholder');
         console.log($('[data-icon]').get().map(n => n.dataset.icon));
        elemPlaceholder.removeClass($('[data-icon]').get().map(n => n.dataset.icon)).addClass(this.dataset.icon);

      })


      $('body').on('input', '.select__input', function (e) {
          let isFound;
          $(e.target).parent().siblings('li').each((i, el) => {
              let is = $(el).html().toLowerCase().indexOf(e.target.value.toLowerCase()) != -1;
              $(el).css("display", is ? "block" : "none");
              if(is) isFound = true;
          });
          $('.select__item-search-not-found').css("display", isFound ? "none" : "block");
      })

      $(document).on('click', function (e) {
          var $select__wrap = $(".select__wrap");
          if (!$select__wrap.is(e.target) && $select__wrap.has(e.target).length === 0) {
              hideSelectList($select__wrap)
          }
      });

      function showSelectList($select__wrap) {
          let $select__list = $select__wrap.find(".select__list");

          let { height, top, bottom } = $select__list.get(0).getBoundingClientRect();
          if($(window).height() < bottom - 16 && top > height + 16 * 2) {
          $select__wrap.addClass('select__wrap--position-top');
          }

          $('.select__wrap').removeClass('select__wrap--active');
          $select__wrap.addClass('select__wrap--start-active');
          setTimeout(() => {
              $select__wrap.removeClass('select__wrap--start-active').addClass('select__wrap--active');
              let duration = getTransitionDuration($select__list);
              setTimeout(() => {$select__wrap.addClass('select__wrap--end-active')}, duration)
          }, 0)
          
      }

      function hideSelectList($select__wrap) {
          $select__wrap.removeClass('select__wrap--active');
          let duration = getTransitionDuration($select__wrap.find(".select__list"));
          setTimeout(() => {$select__wrap.removeClass('select__wrap--position-top select__wrap--end-active')}, duration)
      }

      function setPlaceholder(self) {
          var value_pl = $(self).html();
          $(self).parents('.select__wrap').find('.select__placeholder').html(value_pl);
      }

      function checkActive(self) {
          var text = $(self).find('.select__item--active').text();
          if (text === undefined || text === '') {
              text = $(self).find('.select__item:not(.select__item--disabled):eq(0)').addClass('select__item--active').text();
          }
          $(self).find('.select__placeholder').html(text);
      }

      // Возвращает макс прододжительность анимации $self
      // Поддерживает только время в секундах (s)
      function getTransitionDuration($self) {
          return Math.max(...$self.css('transition-duration').split('s,').map(parseFloat), 0) * 1000 + 50;
      }

      }

  })();



});


*/