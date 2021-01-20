import React from 'react';
import ApiContext from '../../ApiContext';
import config from '../../config'

function ListOfCities(props) {
    return (
            <option value={props.city}>{props.city}</option>
    )
}

class Kentucky extends React.Component {
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
        <svg xmlns="http://www.w3.org/2000/svg"><path className="cls-1" d="M12.3,19.23a14.69,14.69,0,0,1-3.57.19c-.49,0-1.07-.05-1.37.32C6.07,21.36,4.26,21,2.57,21.08c-2.1.07-2.1,0-2.06-2.08,0-1.83.18-2,2-2H3.7a.77.77,0,0,0,.89-.74,9.21,9.21,0,0,1,2.94-5.06,1.74,1.74,0,0,1,1.2-.45c1.44-.11,2.94.38,4.31-.44a.55.55,0,0,1,.47,0c.91.41,1.14,0,1.26-.86a1,1,0,0,1,1.69-.69c.72.62.82.16,1.18-.31.84-1.07,1.11-2.43,1.95-3.5.71-.9,1.33-1.87,2.58-2.1.48-.09.66-.56.85-.95C23.75.38,24.24.18,25.78.9a5.08,5.08,0,0,1,1.11.7,4.59,4.59,0,0,0,4.48.85c1.3-.33,2.53-.56,3.68.52.63.59.43,1.33.71,2,.69,1.61,2,2.73,3,4.11.34.48.38.68-.06,1.17-1.34,1.52-2.79,3-4.07,4.53C33,16.7,31,17.07,28.7,17.25c-1.63.12-3.25.34-4.87.49Z"/></svg>
                </aside>
            </div>
        )
    }
}

export default Kentucky;;