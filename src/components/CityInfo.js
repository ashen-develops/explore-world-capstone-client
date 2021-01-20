import React from 'react';
import config from '../config'

class CityInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: null,
            error: '',
            allStates: [],
            just: [],
            justStates: [],
        }
    }

    // On component mount have all state info go into allStates
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
    // For each set of state info separate each question and link into a HTML function
    // setState for every event and link if props.currentCity === allStates.city (forEach) then render the info 

    render() {
        console.log(this.props.currentCity)
        return(
            <div>
                <h2>{this.props.currentCity}</h2>
            </div>
        )
    }
}

export default CityInfo