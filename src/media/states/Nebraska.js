import React from 'react';
import ApiContext from '../../ApiContext';
import config from '../../config'

function ListOfCities(props) {
    return (
            <option value={props.city}>{props.city}</option>
    )
}

class Nebraska extends React.Component {
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
        <svg xmlns="http://www.w3.org/2000/svg"><path className="cls-1" d="M34.26,21.86c-3.2,0-6.41.15-9.59,0-4-.23-8.06-.15-12.09-.2-.89,0-1.3-.29-1.27-1.26,0-1.76,0-3.52,0-5.28,0-.57-.16-.79-.78-.92-1.89-.42-3.83,0-5.72-.42a21.47,21.47,0,0,0-3.3-.45C.59,13.22.38,12.71.56,12A30.5,30.5,0,0,0,1.1,6.14c.06-1.64.72-3.16.63-4.8,0-.43.09-.74.7-.69,3.42.29,6.86.07,10.3.14A19.72,19.72,0,0,1,16.07,1,3.1,3.1,0,0,0,18.16.68,3,3,0,0,1,19.8.55c3,.38,6,.1,8.92.71a8.55,8.55,0,0,1,3.7,1.2,1,1,0,0,0,1.21,0C36.46,1.14,39,2.34,40.2,5.2a79.58,79.58,0,0,1,3.35,10.28,45,45,0,0,0,1.62,5.22c.37.9.15,1.21-.84,1.2-3.36,0-6.71,0-10.07,0Z"/></svg>
                </aside>
            </div>
        )
    }
}

export default Nebraska;;