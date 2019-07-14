import moment from 'moment'

export function calendar (value) {
  const m = moment(new Date(value))
  window.m = m
  m.locale('fr-FR')
  return m.calendar(null, {
    lastDay: '[Hier]',
    sameDay: "[Aujourd'hui]",
    nextDay: '[Demain]',
    lastWeek: 'dddd',
    nextWeek: 'dddd',
    sameElse: 'D MMMM'
  })
}
