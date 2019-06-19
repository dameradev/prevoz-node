module.exports = function() {
var dates = []
  var currentDate = new Date()
  var endDate = new Date()
  
  endDate.setFullYear(endDate.getFullYear()+1)
  
  var addDays = function (days) {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
  }
  
  while (currentDate <= endDate) {
    dates.push(currentDate)
    currentDate = addDays.call(currentDate, 1)
  }
  return dates;     
}