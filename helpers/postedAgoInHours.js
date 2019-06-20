module.exports = function(postedAgo) {
  let postedAgoInWords = "";
  let timeNow = new Date();
  let postedAgoInHours = timeNow.getHours() - postedAgo.getHours();
  let postedAgoInMinutes = timeNow.getMinutes() - postedAgo.getMinutes();
  return postedAgoInWords = "пред " + postedAgoInHours + " час(а), " + Math.abs(postedAgoInMinutes) + " минута/и.";
}