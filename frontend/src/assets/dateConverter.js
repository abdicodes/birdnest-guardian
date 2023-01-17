const dateConverter = (string) => {
  const date = new Date(string);
  const mm = date.getMonth() + 1; // getMonth() is zero-based
  const dd = date.getDate();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const h = date.getHours();

  return [
    date.getFullYear(),
    '-',
    (mm > 9 ? '' : '0') + mm,
    '-',
    (dd > 9 ? '' : '0') + dd,
    `  ${(h > 9 ? '' : '0') + h}:${(min > 9 ? '' : '0') + min}:${
      (sec > 9 ? '' : '0') + sec
    }`,
  ].join('');
};

export default dateConverter;
