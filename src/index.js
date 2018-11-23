const { of, never } = require('fluture')

// epicHandler :: Result -> Action -> String -> Future
const epicHandler = result => action => epicType =>
  action.type === epicType
    ? of(result)
    : never

// dispatcher :: Dispatch -> Actions -> IO
const dispatcher = dispatch => actions => {
  if (!actions) {
    return
  }

  // An array of actions was returned
  if (actions.constructor === Array) {
    actions.map(a => dispatch(a))
    return
  }

  // Just one action was returned
  if (actions.type !== undefined) {
    dispatch(actions)
  }
}

// meatball :: Epic[] -> Store -> Next -> Action -> IO
const meatball = epics => {
  if (!epics || epics.constructor !== Array) {
    throw new Error('EPICS PASSED TO MEATBALL MUST BE AN ARRAY')
  }
  
  return store => next => action => {

    const preActionState = store.getState()
    
    const result = next(action)

    const actioner = dispatcher(store.dispatch)

    epics.map(
      epic => epic(epicHandler(result)(action), preActionState)
        .fork(actioner, actioner)
    )
    
  }
}

module.exports = meatball