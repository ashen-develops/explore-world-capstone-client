import React from 'react';
import ApiContext from '../../ApiContext';
import config from '../../config'

function ListOfCities(props) {
    return (
            <option value={props.city}>{props.city}</option>
    )
}

class Maryland extends React.Component {
    static contextType = ApiContext;

    constructor(props) {
        super(props);
        this.state = {
            //need to pass down current state from main component
            // currentState: null,
            error: '',
            allStates: [],
            stateObj: [],
            justCities: [],
            setStates: () => {}
        }
    }
    handleChange(e){
        this.setState({ currentState: e.currentTarget.value})
        console.log(`${this.state.currentState}`)
        console.log(this.state)
        console.log(this.state.allStates[0].city)
    }
    generateCitySelect(cities) {
        let result = [];
        cities.forEach((city) => {
            result.push(<ListOfCities city={city} />)
        });
        return <select id="citySelect" name="citySelect" onChange={e => this.handleChange(e)}>{result}</select>
    }

    setStates = (states) => {
        this.setState({ allStates: states });
    };

    //seperate the two objects into their own state component that match currentState
    seperateCurrentStateObj(stateObjs) {
        let result = [];
        stateObjs.forEach((stateObj) => {
            if (this.props.stateName === stateObj.state){
                result.push(stateObj)
            }
        })
        return this.setState({ stateObj: result })
    }
    
    //set state cities based on the cities under the name of the currentState
    setCities(cities) {
        let result = [];
        cities.forEach((city) => {
            result.push(city.city)
            console.log(this.state)
        });
        return this.setState({ justCities: result })
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
            //   console.log(resJson)
              this.setStates(resJson)
              this.seperateCurrentStateObj(this.state.allStates);
              console.log("before", this.state)
              this.setCities(this.state.stateObj)
              console.log("after", this.state)
          })
          .catch(err => {
            console.log('error:', err)
          })     
    }

    render(){
        return(
            <div>
                {/* once currentState is defined in state, this should work */}
                {this.props.stateName
                ? this.generateCitySelect(this.state.justCities)
                : null}
                <aside>
        <svg xmlns="http://www.w3.org/2000/svg"><path className="cls-1" d="M16.86,6.84c-.44.14-.78,0-.74-.47.08-.87-.44-1.71-.07-2.6.15-.35.07-.8-.5-.59a28.9,28.9,0,0,1-4.22.74c-.55.11-.85.28-.83.92a2.36,2.36,0,0,1-.62,1.63.88.88,0,0,1-1.26.27A17.55,17.55,0,0,1,6.31,5.3a2.56,2.56,0,0,0-3.19-.11c-.53.28-1,.63-1.55.88a.66.66,0,0,1-1-.46c-.17-.67.16-.85,1.31-1A27.24,27.24,0,0,0,7,3.5C10.83,2.28,14.82,1.63,18.7.57c.69-.19,1,0,1.09.63.12.78.88,1.48.33,2.35l.58,1a11.31,11.31,0,0,1,0,1.3c-.06.66.21,1,.85,1,0,2,.33,2.49,2.46,2.92a1.16,1.16,0,0,1,.89,1.59,15,15,0,0,0-1.35,5.57c0,.78-.32,2-1.16,2-.63,0-.53-1.3-.56-2.08a20.75,20.75,0,0,0-.15-3.34A2.39,2.39,0,0,0,19,11.2a10,10,0,0,1-1.55,0c-.75-.1-1.09-.48-.83-1.31a7.42,7.42,0,0,0,.44-3l.43-.9"/></svg>
                </aside>
            </div>
        )
    }
}

export default Maryland;;