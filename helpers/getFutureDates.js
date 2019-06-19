module.exports = function() {
  let dates = []
  let currentDate = new Date()
  let endDate = new Date()
  
  endDate.setFullYear(endDate.getFullYear()+1)
  
  let addDays = function (days) {
    let date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
  }
  
  while (currentDate <= endDate) {
    dates.push(currentDate)
    currentDate = addDays.call(currentDate, 1)
  }
  return dates;     
}