import React from 'react';
import ApiContext from '../../ApiContext';
import config from '../../config'

function ListOfCities(props) {
    return (
            <option value={props.city}>{props.city}</option>
    )
}

class Georgia extends React.Component {
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
        <svg xmlns="http://www.w3.org/2000/svg"><path className="cls-1" d="M5.72,20.83a6.3,6.3,0,0,0-1-4A10.81,10.81,0,0,1,3.8,14c-.87-3.29-2-6.51-3-9.77C.27,2.37.23,2.19,2.18,2A89.29,89.29,0,0,0,11.37.59C12.25.39,13,.42,13,1.77A1.68,1.68,0,0,0,14.81,3.4a1.75,1.75,0,0,1,1.52.77,23.34,23.34,0,0,0,4.72,4.54A20.21,20.21,0,0,1,25.25,13c1.12,1.66,2.19,3.38,3.32,5.05.09.13.12.36.23.41,1.65.71.78,1.86.44,2.82A21,21,0,0,0,28.05,27c-.07.92-.28,1.28-1.24,1.2-.46,0-1.52-.29-.67.86.3.4-.07.72-.35.88-.47.26-.61,1-1.46.74-1.35-.47-2.74-.17-4.13-.13-1.57,0-3.14.64-4.67.24a8.94,8.94,0,0,0-3.39.19A12.89,12.89,0,0,1,9,31a2.38,2.38,0,0,1-1.85-2.1,14.55,14.55,0,0,0-.92-3.17A11.55,11.55,0,0,1,5.72,20.83Z"/></svg>
                </aside>
            </div>
        )
    }
}

export default Georgia;