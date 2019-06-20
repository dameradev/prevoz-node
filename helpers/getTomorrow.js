module.exports = function (today) {
  let tommorow = new Date();
  tommorow = tommorow.setDate(today.getDate() + 1);
  return tommorow = new Date(tommorow);
}