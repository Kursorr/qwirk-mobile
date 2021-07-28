export default class Timer {
  dateParam: string;
  MONTH_NAMES: object;

  constructor(dateParam) {
    this.dateParam = dateParam;
    this.MONTH_NAMES = [
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
    ];
  }

  timeAgo() {
    if (!this.dateParam) {
      return "";
    }
    const date: any = new Date(this.dateParam);

    return this.getFormattedDate(date);
  };
  getFormattedDate(date, prefomattedDate?, hideYear = false) {
    const day = date.getDate();
    const month = this.MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (prefomattedDate) {
      return `${prefomattedDate}`;
    }

    if (hideYear) {

      return `${month} ${day}`;
    }


    return `${month} ${day}, ${year} ${strTime}`;
  };
}
