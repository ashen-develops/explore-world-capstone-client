import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import config from '../config'
import jsxToString from 'jsx-to-string';
import AuthApiService from '../services/auth-api-service'
import * as States from '../media/states'

function ListOfStates(props) {
    return (
            <option value={props.state}>{props.state}</option>
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
        // console.log(`${config.API_ENDPOINT}/states`)
        // this.separateStates(this.state.allStates)
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
        this.setState({ currentState: e.currentTarget.value})
        console.log(this.context)
        // console.log(`${this.state.currentState}`)
        // console.log(this.state)
        // console.log(this.state.allStates[0].state)
        // console.log(States)
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
    // component(select){
    //     let MyComponent = this.state.currentState
    //     if(this.state.currentState){
    //         return jsxToString(<div><MyComponent /></div>)
    //     }
    //     else { return null }
    // }
    renderSelectedState(selected) {
        if (!selected)
          return null;
    
        const State = States[selected];
    
        return <State />;
      }

    // handleDynamicSelect(){
    //     //if statement to match current state with state.state from fetch, then populate with cities attached to that state
    //     if (this.state.currentState === )
    // }

    render(){
        // let MyComponent = this.state.currentState
        return(
            <div>
                <h2>Choose Your Desired State</h2>
                <form onSubmit={this.test}>
                    {this.state.allStates
                    ? this.generateStateSelect(this.state.justStates)
                    : null}
                </form>
                <div>
                    {this.renderSelectedState(this.state.currentState)}
                    {/* {this.state.currentState ? <MyComponent /> : <Texas />} */}
                    {/* <MyComponent /> */}
                </div>
            </div>
        )
    }
}

export default StateSelector;