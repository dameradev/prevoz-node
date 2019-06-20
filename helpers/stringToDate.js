module.exports = function(date) {
  let onlyDate = date.replace(/[^0-9.]/g, "");
  const reversed = onlyDate.split(".").reverse().join(".");
  date = new Date(reversed);
  return date.setDate(date.getDate() + 1)
}