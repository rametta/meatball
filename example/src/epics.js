import { setText1, setText2, setText3 } from './reducer'
import { after } from 'fluture'

const epic1 = (actionType, state) => actionType('SET_TEXT1')
  .chain(({ payload }) => after(1500, setText2('2')))
  .chainRej(() => after(1500, [setText2('2FAILED')]))

const epic2 = actionType => actionType('SET_TEXT2')
  .chain(({ payload }) => after(1500, [setText3('3')]))

const epic3 = actionType => actionType('SET_TEXT3')
  .chain(({ payload }) => after(1500, [setText1('1')]))

export default [
  epic1,
  epic2,
  epic3
]