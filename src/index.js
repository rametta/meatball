// dispatcher :: Dispatch -> Action|Action[] -> IO
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
    throw new Error('MEATBALL EPICS MUST BE AN ARRAY')
  }

  let counter = 1
  const cache = {}
  
  return store => next => action => {

    const preActionState = store.getState()
    const result = next(action)
    const actioner = dispatcher(store.dispatch)

    epics
      .filter(epic => epic.type.indexOf(action.type) > -1)
      .forEach(epic => {
        const unsub = epic.do(result, preActionState).fork(actioner, actioner)

        if (epic.latest) {
          const id = counter++

          if (cache[epic.type.toString()] && cache[epic.type.toString()].id !== id) {
            cache[epic.type.toString()].unsub()
          }

          cache[epic.type] = { id, unsub }
        }

      })
    
  }
}

module.exports = meatball