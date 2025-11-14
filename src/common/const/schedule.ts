export const SCHEDULE_SLOTS = [
  { number: 1, start: '8:00', end: '9:30' },
  { number: 2, start: '9:50', end: '11:20' },
  { number: 3, start: '11:40', end: '13:10' },
  { number: 4, start: '13:40', end: '15:10' },
  { number: 5, start: '15:30', end: '17:00' },
  { number: 6, start: '17:20', end: '18:50' },
] as const;

export const WEEKDAYS = [
  { id: 1, name: 'Понедельник', short: 'Пн' },
  { id: 2, name: 'Вторник', short: 'Вт' },
  { id: 3, name: 'Среда', short: 'Ср' },
  { id: 4, name: 'Четверг', short: 'Чт' },
  { id: 5, name: 'Пятница', short: 'Пт' },
  { id: 6, name: 'Суббота', short: 'Сб' },
] as const;

export enum WeekType {
  Even = 'even',
  Odd = 'odd',
}