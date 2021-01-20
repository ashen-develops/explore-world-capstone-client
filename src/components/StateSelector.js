import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import config from '../config'
import jsxToString from 'jsx-to-string';
import AuthApiService from '../services/auth-api-service'
import * as States from '../media/states'

function ListOfStates(props) {
    return (
            <option key={props.state} value={props.state}>{props.state}</option>
    )
}

class StateSelector extends React.Component {
    static contextType = ApiContext;

    constructor(props) {
        super(props);
        this.state = {
            currentState: null,
            error: '',
            allStates: [],
            just: [],
            justStates: [],
            setStates: () => {}
        }
    }
    setStates = (states) => {
        this.setState({ allStates: states });
      };
    separateStates(states) {
        let result = [];
        states.forEach((state) => {
            result.push(state.state)
        });
        return this.setState({ just: result })

    }
    removeDuplicates() {
        let chars = this.state.just;
        let uniqueChars = [...new Set(chars)];

        this.setState({ justStates: uniqueChars });
    }

    componentDidMount() {
        return fetch(`${config.API_ENDPOINT}/states`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
            },
          })
          .then(res =>
            (!res.ok) ?
            res.json().then(e => Promise.reject(e)) :
            res.json()
          )
          .then((resJson) => {
              console.log(resJson)
              this.setStates(resJson)
              this.separateStates(this.state.allStates)
              this.removeDuplicates()
          })
          .catch(err => {
            console.log('error:', err)
          })
          
    }

    //create functions that will display appropriate State for selected state
    handleChange(e){
        console.log(e.currentTarget.value)
        this.setState({ currentState: e.currentTarget.value})
    }
    handleSubmit = (e) => {
        e.preventDefault();
    }

    generateStateSelect(states) {
        let result = [];
        states.forEach((state) => {
            result.push(<ListOfStates state={state} />)
        });
        return <select id="stateSelect" name="stateSelect" onChange={e => this.handleChange(e)}>{result}</select>
    }

    renderSelectedState(selected) {
        if (!selected)
          return null;
    
        const State = States[selected];
        console.log(this.state.currentState)
    
        return <State stateName={this.state.currentState}/>;
      }


    render(){

        return(
            <div>
                <h2>Choose Your Desired State</h2>
                <form onSubmit={this.test}>
                    {this.state.allStates
                    ? this.generateStateSelect(this.state.justStates)
                    : null}
                    <div>
                        {this.renderSelectedState(this.state.currentState)}
                    </div>
                </form>
            </div>
        )
    }
}

export default StateSelector;