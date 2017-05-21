export default class DateRange {
  start: Date
  end: Date

  constructor ({ start, end }) {
    this.start = Date(start)
    this.end = Date(end)
  }

  /**
   * DateRange duration in days.
   * @returns {number}
   */
  calculateDuration (): Number {
    // Copy date parts of the timestamps, discarding the time parts.
    const one = new Date(this.start.getYear(), this.start.getMonth(), this.start.getDate())
    const two = new Date(this.end.getYear(), this.end.getMonth(), this.end.getDate())

    // Do the math.
    const millisecondsPerDay = 1000 * 60 * 60 * 24
    const millisBetween = two.getTime() - one.getTime()
    const days = millisBetween / millisecondsPerDay

    // Round down.
    return Math.floor(days)
  }
}