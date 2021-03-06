{
  let view = {
    el: ".calendarWrapper",
    init() {
      this.$el = $(this.el);
    },
    template: `
        <td id="{{month}}-{{num}}">
            <span>
                {{date}}
            </span>
        </td>
    `,
    render(data) {
      let dateList = data[0];
      let today = data[1];
      let i = 0;
      let newArrary = [];
      while (i < dateList.length) {
        newArrary.push(dateList.slice(i, (i += 7)));
      }
      for (let key in today) {
        this.$el.find(`.calendarToday #${key}`).text(today[key]);
      }
      this.$el.find("tbody").empty();
      newArrary.forEach((week, index) => {
        
        let $tr = $(`<tr id=${index}></tr>`);
        this.$el.find("tbody").append($tr);
        week.forEach((day) => {
          $td = $(
            this.template
              .replace("{{date}}", day.date)
              .replace("{{month}}", day.enMonth)
              .replace("{{num}}", day.date)
          );
          this.$el.find(`tr#${index}`).append($td);
        });
      });

      let calendarTitle = dateList[dateList.length - 15];
      for (let key in calendarTitle) {
        this.$el.find(`.calendarTitle #${key}`).text(calendarTitle[key]);
      }
      dateList.forEach((day) => {
        let date = day.date + "";
        if (day.date < 10) {
          date = "0" + date;
        }
        let day_enMounth = day.enMonth.slice(0, 3);
        // console.log(dateList)
        if (date === today.day && day_enMounth === today.engMonth && day.year === today.year) {
          this.$el
            .find(`#${day.enMonth}-${day.date} > span`)
            .addClass("active");
        }
        if (day_enMounth === today.engMonth && day.year === today.year) {
          this.$el.find(`td[id^=${day.enMonth}]`).children().addClass("x");
        }
      });
    },
  };
  let model = {
    data: {
      dateList: [],
      today: {},
      dateTable: {
        enMonth: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        cnMonth: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
        enWeek: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      },
    },
    getTodayDate() {
      // 获取当天的年月日
      let today = Date().split(" ");
      let [week, engMonth, day, year] = today;
      // 将月份转为数字，这里月份是从0开始的，所有获取到的月份比实际月份少一,如，现在是5月，month则为4
      let numMonth = new Date().getMonth();
      let chMonth = this.data.dateTable.cnMonth[numMonth];
      this.data.dateTable.enWeek.forEach((weekday) => {
        let head = weekday.slice(0, 3);
        if (head === week) {
          week = weekday;
        }
      });
      this.data.today = { week, engMonth, day, year, chMonth, numMonth };
    },
    setDateList(today) {
      return new Promise((resolve, reject) => {
        this.data.dateList = []
        let currentMonthDays = this.getOneMonthDays(today.year, today.numMonth);
        let firstDayInCurentMonth = this.getDayOfWeek(
          today.year,
          today.numMonth,
          1
        );
        // 因为我写的日历每周是从周日开始的，所有要先判断第一天是周几，不是周一的话用上个月的后几天补齐
        if (firstDayInCurentMonth !== 0) {
          // 先判断本月是不是1月，如果是1月，则上个月就是去年的12月
          let isPreMonth = today.numMonth === 0;
          let preMonth = isPreMonth ? 11 : today.numMonth - 1;
          let preYear = isPreMonth ? today.year - 1 + '' : today.year;
          // 获取上个月一共多少天
          let preMonthDays = this.getOneMonthDays(preYear, preMonth);
          for (let i = firstDayInCurentMonth - 1 ; i >= 0; i--) {
            let indexP = this.getDayOfWeek(preYear, preMonth, preMonthDays - i);
            this.data.dateList.push(
              this.setDateListItem({
                year: preYear,
                month: preMonth,
                date: preMonthDays - i,
                dateTableIndex: indexP,
              })
            );
          }
        }
        // 将本月各天的信息放入数组
        for (let i = 1; i <= currentMonthDays; i++) {
          let indexC = this.getDayOfWeek(today.year, today.numMonth, i);
          this.data.dateList.push(
            this.setDateListItem({
              year: today.year,
              month: today.numMonth,
              date: i,
              dateTableIndex: indexC,
            })
          );
        }
        // 判断本月最后一天是否是周六，如果不是用下个月的前几天补齐,通过判断dateList的length是否是7的倍数来判断
        let currentDateListLen = this.data.dateList.length;
        if (currentDateListLen % 7) {
          let isNextMonth = today.numMonth === 11;
          let nextMonth = isNextMonth ? 0 : today.numMonth + 1;
          let nextYear = isNextMonth ? year + 1 : today.year;
          let diff = 7 - (currentDateListLen % 7);
          for (let i = 1; i <= diff; i++) {
            let indexN = this.getDayOfWeek(nextYear, nextMonth, i);
            this.data.dateList.push(
              this.setDateListItem({
                year: nextYear,
                month: nextMonth,
                date: i,
                dateTableIndex: indexN,
              })
            );
          }
        }
        // return { dateList: this.data.dateList, today: this.data.today };
        if (this.data.dateList.length !== 0) {
          resolve([this.data.dateList, this.data.today]);
        }
      });
    },
    // 获取当前月份有多少天，此时第二个参数应该为正常月份，即5月就是5，所有month需要加一
    getOneMonthDays(year, month) {
      return new Date(year, month + 1, 0).getDate();
    },
    // 获取当月某一天是周几，此时传入的月份应该是减一的月份
    getDayOfWeek(year, month, day) {
      return new Date(year, month, day).getDay();
    },
    setDateListItem({ year, month, date, dateTableIndex }) {
      return {
        date,
        year,
        cnMonth: this.data.dateTable.cnMonth[month],
        enMonth: this.data.dateTable.enMonth[month],
        enWeek: this.data.dateTable.enWeek[dateTableIndex],
      };
    },
  };
  let controller = {
    init(view, model) {
      this.view = view;
      this.view.init();
      this.model = model;
      this.model.getTodayDate();
      this.model.setDateList(this.model.data.today).then((data) => {
        this.view.render(data);
      });
      this.bindEvent();
    },
    bindEvent() {
      let changeMonth = {};
      Object.assign(changeMonth, this.model.data.today);
      this.view.$el.find(".switchingTime").on("click", "div", (e) => {
        if (e.currentTarget.className === "left") {
          if(changeMonth.numMonth === 0){
            changeMonth.year = changeMonth.year - 1 + ''
            changeMonth.numMonth = 11
          }else{
            changeMonth.numMonth = changeMonth.numMonth - 1;
          }
        } else {
          if(changeMonth.numMonth === 11){
            changeMonth.year = + changeMonth.year + 1 + ''
            changeMonth.numMonth = 0
          }else{
            changeMonth.numMonth = changeMonth.numMonth + 1;
          }
        }
        this.model.setDateList(changeMonth).then((data) => {
          this.view.render(data);})
      });
    },
  };
  controller.init(view, model);
}
