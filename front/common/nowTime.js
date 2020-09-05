export const baseTime = () => {
  const now = new Date(Date.now());
  const year = now.getFullYear().toString();
  const month =
    now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
  const day = now.getDay() < 10 ? '0' + now.getDay() : now.getDay();

  const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
  const minute =
    now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
  return { now, year, month, day, hour, minute, second };
};
export const YYYYMMDDhhmmss = () => {
  const { now, year, month, day, hour, minute, second } = baseTime();
  return year + month + day + hour + minute + second;
};

export const YYYYMMDD = () => {
  const { now, year, month, day, hour, minute, second } = baseTime();
  return year + month + day;
};

export default YYYYMMDD;
