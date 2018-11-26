export const setText1 = payload => ({ type: 'SET_TEXT1', payload })
export const setText2 = payload => ({ type: 'SET_TEXT2', payload })
export const setText3 = payload => ({ type: 'SET_TEXT3', payload })
export const doAsync = payload => ({ type: 'DO_ASYNC', payload })
export const doAsyncRes = payload => ({ type: 'DO_ASYNC_RES', payload })

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TEXT1':
      return {
        ...state,
        text1: action.payload
      }
    case 'SET_TEXT2':
      return {
        ...state,
        text2: action.payload
      }
    case 'SET_TEXT3':
      return {
        ...state,
        text3: action.payload
      }
    case 'DO_ASYNC':
      return {
        ...state,
        loading: true,
        id: action.payload
      }
    case 'DO_ASYNC_RES':
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    default:
      return state
  }
}