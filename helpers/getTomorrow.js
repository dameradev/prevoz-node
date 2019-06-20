module.exports = function (today) {
  let tommorow = new Date();
  tommorow = tommorow.setDate(today.getDate());
  return tommorow = new Date(tommorow);
}