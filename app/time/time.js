import moment from 'moment'
import now from './now'

export default function getNow() {
  return moment(now()).format('YYYY-MM-DD')
}
