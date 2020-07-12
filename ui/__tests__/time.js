import { msToTime } from '../src/time';

test('converts local ms to local time string', () => {
  const minToMs = (min) => min * 60 * 1000;
  const hrToMs = (hr) => minToMs(hr * 60);
  expect(msToTime(0)).toBe('00:00');
  expect(msToTime(hrToMs(24) - 1)).toBe('23:59');
  expect(msToTime(hrToMs(12))).toBe('12:00');
  expect(msToTime(hrToMs(13) * minToMs(23))).toBe('13:23');
  expect(msToTime(hrToMs(12) * minToMs(10))).toBe('12:10');
  expect(msToTime(hrToMs(0) * minToMs(10))).toBe('00:10');
});
