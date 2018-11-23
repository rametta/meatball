import React from 'react';
import { connect } from "react-redux";
import { setText1, setText2 } from './reducer'

const App = props => 
  <>
    <button type="button" onClick={() => props.setText1('hello')}>set hello</button>
    <button type="button" onClick={() => props.setText1('goodbye')}>set goodbye</button>

    <button type="button" onClick={() => props.setText2('hello2')}>set2 hello</button>
    <button type="button" onClick={() => props.setText2('goodbye2')}>set2 goodbye</button>
  </>

export default connect(state => ({ state }), { setText1, setText2 })(App);
