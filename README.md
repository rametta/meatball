[![npm](https://img.shields.io/npm/v/meatball.svg)](http://npm.im/meatball)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/rametta/meatball/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

# 🍝 Meatball

> [Future](https://github.com/fluture-js/Fluture) based redux side effects

*Alternative to rxjs and redux-observable*

## Install
```sh
yarn add meatball
```

Meatball has a peer dependency on [fluture](https://github.com/fluture-js/Fluture)
```sh
yarn add fluture
```

## Usage example
```js
// epics.js
import { action1, action2 } from './reducer'
import { after } from 'fluture'

const epic1 = actionType => actionType('ACTION_1')
  .chain(({ payload }) => after(1500, action2('hello')))
  .mapRej(() => action2('fail'))

const epic2 = actionType => actionType('ACTION_2')
  .map(({ payload }) => [action1('bonjour')])

export default [ epic1, epic2 ]

// index.js
import meatball from 'meatball'
import epics from './epics'

const store = createStore(
  reducers,
  applyMiddleware(meatball(epics))
)
```

[Real example](/example)