import React from 'react';
import config from '../config'
import * as States from '../media/states'

function ListOfStates(props) {
    return (
            <option key={props.state} value={props.state}>{props.state}</option>
    )
}

class StateSelector extends React.Component {

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
        return result
    }

    renderSelectedState(selected) {
        if (!selected)
          return null;
        
        const State = States[selected.replace(" ", "")];
        console.log(this.state.currentState)
    
        return <State className={this.state.currentState.toLowerCase()} stateName={this.state.currentState}/>;
      }


    render(){

        return(
            <div>
                <main>
                    <div className="selectionPage">
                        <h2>Choose Your Desired State</h2>
                        <div className="selectBoxes">
                            <select id="stateSelect" name="stateSelect" onChange={e => this.handleChange(e)}>
                                <option key="..." value="...">...</option>
                                {this.state.allStates
                                ? this.generateStateSelect(this.state.justStates)
                                : null}
                            </select>
                            <div>
                                {this.renderSelectedState(this.state.currentState)}
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        )
    }
}

export default StateSelector;