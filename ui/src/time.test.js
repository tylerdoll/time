import { calcHoursWorked, localTimeToMinSinceMidnight } from '../src/time';

test('convert local time to minutes since midnight', () => {
  expect(localTimeToMinSinceMidnight('00:00')).toBe(0);
  expect(localTimeToMinSinceMidnight('12:00')).toBe(12 * 60);
  expect(localTimeToMinSinceMidnight('23:59')).toBe(23 * 60 + 59);
  expect(localTimeToMinSinceMidnight('12:10')).toBe(12 * 60 + 10);
  expect(localTimeToMinSinceMidnight('00:10')).toBe(10);
});

test('calculate hours worked', () => {
  expect(calcHoursWorked('00:00', '12:00')).toBe(12);
  expect(calcHoursWorked('09:15', '11:15')).toBe(2);
  expect(calcHoursWorked('12:00', '19:30')).toBe(7.5);
  expect(calcHoursWorked('13:00', '13:01')).toBe(0.1);
  expect(calcHoursWorked('13:00', '13:06')).toBe(0.1);
  expect(calcHoursWorked('13:00', '13:07')).toBe(0.2);
  expect(calcHoursWorked('20:00', '02:07')).toBe(6.2);
});
