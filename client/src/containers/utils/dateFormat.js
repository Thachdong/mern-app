export default (time) => {
  const date = new Date(time);
  const minute = date.getMinutes();
  const hours = date.getHours();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year} / ${hours}:${minute}`;
};
