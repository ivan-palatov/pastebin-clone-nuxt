function diffYMDHMS(date1, date2) {
  const years = date1.diff(date2, 'year');
  date2.add(years, 'years');

  const months = date1.diff(date2, 'months');
  date2.add(months, 'months');

  const days = date1.diff(date2, 'days');
  date2.add(days, 'days');

  const hours = date1.diff(date2, 'hours');
  date2.add(hours, 'hours');

  const minutes = date1.diff(date2, 'minutes');
  date2.add(minutes, 'minutes');

  return { years, months, days, hours, minutes };
}

export function getStringDiff(date1, date2) {
  const { days, hours, minutes, months, years } = diffYMDHMS(date1, date2);

  if (years >= 1) {
    return 'более года';
  }
  if (months >= 5) {
    return months + ' месяцев';
  }
  if (months > 1) {
    return months + ' месяца';
  }
  if (months === 1 || days >= 24) {
    return '1 месяц';
  }
  if ([1, 21].includes(days)) {
    return days + ' день';
  }
  if ([2, 3, 4, 22, 23].includes(days)) {
    return days + ' дня';
  }
  if (days > 0) {
    return days + ' дней';
  }
  if (hours >= 20) {
    return '1 день';
  }
  if (hours >= 5) {
    return hours + ' часов';
  }
  if (hours > 1) {
    return hours + ' часа';
  }
  if (hours === 1 || minutes >= 40) {
    return '1 час';
  }
  return minutes + ' мин.';
}
