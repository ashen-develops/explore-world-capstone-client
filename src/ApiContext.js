import React from 'react'

const ApiContext = React.createContext({
  users: [],
  passwords: [],
  states: null,
  addUser: () => {},
  addPassword: () => {},
  setStates: () => {},
});

export default ApiContext;

export class ApiProvider extends React.Component {
  constructor(props) {
    super(props);
    const state = {
      user: {},
      states: null
    }
  }
  setStates = (states) => {
    this.setState({ states });
  };
  
  render() {
    const value = {
      user: this.state.user,
      states: this.state.states,

      setStates: this.setStates,
    };
    return (
      <ApiContext.Provider value={value}>
        {this.props.children}
      </ApiContext.Provider>
    )
  }
}