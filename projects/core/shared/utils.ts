export const generateUuid = (): string => {
  let d = new Date().getTime();
  let d2 = (performance && performance.now && performance.now() * 1000) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c == 'x' ? r : (r & 0x7) | 0x8).toString(16);
  });
};

export const allEqualToValue = (arr: any, value: boolean): boolean => arr.every((v: any) => v === value);

export const REGEXP_HHMM_FORMAT: RegExp = new RegExp('^(?:\\d|[01]\\d|2[0-3]):[0-5]\\d$');

export const getDateFromString = (value?: string | null): Date | null => {
  const date: Date = new Date();
  let hours: number = 0;
  let minutes: number = 0;

  if (value === null) return null;

  if (value) {
    const splitValue: string[] = value.split(':');
    hours = Number(splitValue[0]);
    minutes = Number(splitValue[1]);
  }

  date.setHours(hours);
  date.setMinutes(minutes);

  return date;
};
