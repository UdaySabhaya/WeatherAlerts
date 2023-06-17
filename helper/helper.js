exports.SendResponse = (res, status, jsonData) => {
  res.status(status).json(jsonData);
};

exports.getFlag = (i) => {
  let current = new Date();
  let flag = 0;
  let date = current.getDate() + i;
  let month = current.getMonth();
  if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
    if (date > 31) {
      date = date - 31;
      flag = 1;
    }
  }
  return flag;
};

exports.getCurrentHours_H = (i) => {
  let current = new Date();
  let hours = current.getHours();
  hours = hours + i;
  if (hours > 12) {
    hours = hours - 12;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  return hours;
};

exports.getCurrentDay = () => {
  let current = new Date();

  let weekDay = new Array(7);
  weekDay[0] = "SUN";
  weekDay[1] = "MON";
  weekDay[2] = "TUES";
  weekDay[3] = "WED";
  weekDay[4] = "THUR";
  weekDay[5] = "FRI";
  weekDay[6] = "SAT";

  let day = weekDay[current.getDay()];
  return day;
};

exports.getCurrentDay_D = (i) => {
  let current = new Date();

  let weekDay = new Array(7);
  weekDay[0] = "SUN";
  weekDay[1] = "MON";
  weekDay[2] = "TUES";
  weekDay[3] = "WED";
  weekDay[4] = "THUR";
  weekDay[5] = "FRI";
  weekDay[6] = "SAT";
  let day;
  let x = weekDay[current.getDay()];
  if (x == "THUR" && i == 3) {
    day = weekDay[0];
  } else if (x == "FRI" && i == 2) {
    day = weekDay[0];
  } else if (x == "FRI" && i == 3) {
    day = weekDay[1];
  } else if (x == "SAT" && i == 1) {
    day = weekDay[0];
  } else if (x == "SAT" && i == 2) {
    day = weekDay[1];
  } else if (x == "SAT" && i == 3) {
    day = weekDay[2];
  } else {
    day = weekDay[current.getDay() + i];
  }
  return day;
};

exports.getCurrentMonth_D = (i) => {
  let current = new Date();
  let month = new Array(12);
  month[0] = "JAN";
  month[1] = "FEB";
  month[2] = "MAR";
  month[3] = "APR";
  month[4] = "MAY";
  month[5] = "JUNE";
  month[6] = "JULY";
  month[7] = "AUG";
  month[8] = "SEPT";
  month[9] = "OCT";
  month[10] = "NOV";
  month[11] = "DEC";

  let month_1 = month[current.getMonth() + i];
  return month_1;
};

exports.getCurrentDate_D = (i) => {
  let current = new Date();
  let date = current.getDate() + i;
  let month = current.getMonth();
  if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
    if (date > 31) {
      date = date - 31;
    }
  }
  return date;
};

exports.getCurrentMonth = () => {
  let current = new Date();

  let month = new Array(12);
  month[0] = "JAN";
  month[1] = "FEB";
  month[2] = "MAR";
  month[3] = "APR";
  month[4] = "MAY";
  month[5] = "JUNE";
  month[6] = "JULY";
  month[7] = "AUG";
  month[8] = "SEPT";
  month[9] = "OCT";
  month[10] = "NOV";
  month[11] = "DEC";

  let month_1 = month[current.getMonth()];
  return month_1;
};

exports.getCurrentDate = () => {
  let current = new Date();
  let date = current.getDate();
  return date;
};

exports.getCurrentHours = (i) => {
  let current = new Date();
  let hours = current.getHours();
  hours = hours + i;
  if (hours > 12) {
    hours = hours - 12;
  }
  if (hours < 10) { 
    hours = "0" + hours;
  }
  return hours;
};

exports.getTempHours = (i) => {
  let current = new Date();
  let hours = current.getHours();
  hours = hours + i;
  return hours;
};

exports.getTZ = (i) => {
  let current = new Date();
  let hours = current.getHours();
  hours = hours + i;
  let tz = "AM";
  if (hours > 11) {
    tz = "PM";
  }
  return tz;
};

exports.getTZ_D = () => {
  let current = new Date();
  let hours = current.getHours();
  let tz = "AM";
  if (hours > 11) {
    tz = "PM";
  }
  return tz;
};
