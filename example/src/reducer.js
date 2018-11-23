export const setText1 = payload => ({ type: 'SET_TEXT1', payload })
export const setText2 = payload => ({ type: 'SET_TEXT2', payload })
export const setText3 = payload => ({ type: 'SET_TEXT3', payload })

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
    default:
      return state
  }
}