import regie from 'regie'
import on from '../../lib/on'

const { observe, state } = regie({
  initialState: {
    date: {
      date: 1,
      month: 4,
      year: 2024
    }
  }
})

const dateDisplay = document.getElementById('date')!

observe('date', date => {
  const newDate = new Date()

  newDate.setDate(date.date)
  newDate.setMonth(date.month - 1)
  newDate.setFullYear(date.year)

  dateDisplay.textContent = `Date: ${newDate.toDateString()}`
})

on<HTMLInputElement>('input[type=number]', 'input', function () {
  state.date[this.dataset.id] = +this.value
})
