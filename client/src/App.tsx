import React from 'react';
import {createBrowserHistory} from 'history';
import Navigation from "./navigation/Navigation";

const history = createBrowserHistory()

function App() {
  return (
      <Navigation history={history}/>
  );
}

export default App;
