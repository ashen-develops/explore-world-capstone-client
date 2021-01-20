import React from 'react';
import ApiContext from '../../ApiContext';
import config from '../../config'

function ListOfCities(props) {
    return (
            <option value={props.city}>{props.city}</option>
    )
}

class Nevada extends React.Component {
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
        <svg xmlns="http://www.w3.org/2000/svg"><path className="cls-1" d="M6.35.55l4.19,1c3.09.72,6.18,1.45,9.28,2.15q6,1.34,12,2.63a12.35,12.35,0,0,0,3,.76.68.68,0,0,1,.7.9c-1,4.09-1.48,8.28-2.3,12.4-.47,2.38-.77,4.79-1.23,7.16-.35,1.79-.68,3.58-1,5.38s-.71,3.82-1.08,5.73c-.41,2.1-.75,4.22-1.27,6.3-.2.8.07,1.68-.49,2.42-.35.47-.5.81-1.17.31-1.25-.92-1.53-.78-1.76.72a19,19,0,0,0-.37,3.92c0,.52.08,1.14-.5,1.36s-.9-.44-1.19-.8c-2.95-3.54-5.74-7.19-8.43-10.93C12.94,39.52,11,37.23,9.46,34.7,7,30.65,3.92,27,1.69,22.77a5.19,5.19,0,0,0-.63-.87,2.61,2.61,0,0,1-.37-2.66c.72-2.48,1.23-5,1.83-7.53C3.33,8.32,4.13,4.92,5,1.53,5.13.91,5.5.32,6.35.55Z"/></svg>
                </aside>
            </div>
        )
    }
}

export default Nevada;;