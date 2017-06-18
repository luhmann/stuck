import moment from 'moment'

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 's',
    m: 'a min',
    mm: '%d min',
    h: '1h',
    hh: '%dh',
    d: '1 day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  },
})

export default moment
