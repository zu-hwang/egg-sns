const baseTime = () => {
  const now = new Date(Date.now());

  const year = now.getFullYear().toString();
  const month =
    now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
  const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();

  const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
  const minute =
    now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
  return { now, year, month, date, hour, minute, second };
};
const YYYYMMDDhhmmss = () => {
  const { now, year, month, date, hour, minute, second } = baseTime();

  return year + month + date + hour + minute + second;
};

const YYYYMMDD = () => {
  const { now, year, month, date, hour, minute, second } = baseTime();

  return year + month + date;
};

module.exports = {
  baseTime,
  YYYYMMDDhhmmss,
  YYYYMMDD,
};
