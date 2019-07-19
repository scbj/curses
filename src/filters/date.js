import moment from 'moment'

export function calendar (value) {
  const m = moment(new Date(value))
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
