/**
 * Convert date to YYYY-MM-DD format
 * @param {Date} date
 */
const yyyymmdd = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  return `${year}-${month}-${day}`
}

/**
 * Get Yesterday's date
 */
const getYesterday = () => {
  var date = new Date()
  date.setDate(date.getDate() - 1)

  return date
}

module.exports = {
  yyyymmdd,
  getYesterday,
}
