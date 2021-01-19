import React from 'react'

const ApiContext = React.createContext({
  currentState: null,
  setCurrentState: () => {}
});

export default ApiContext;