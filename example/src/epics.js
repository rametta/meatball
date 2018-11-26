import { setText2, doAsyncRes } from './reducer'
import { after, of } from 'fluture'

const epic1 = {
  type: 'SET_TEXT1',
  do: ({ payload }) => of([setText2('hello')])
}

const epic2 = {
  type: 'DO_ASYNC',
  latest: true,
  do: ({ payload }) => after(2500, [doAsyncRes(payload)])
}


export default [ epic1, epic2 ]