import React from 'react';
import ApiContext from '../../ApiContext';
import config from '../../config'

function ListOfCities(props) {
    return (
            <option value={props.city}>{props.city}</option>
    )
}

class Michigan extends React.Component {
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
        <svg xmlns="http://www.w3.org/2000/svg"><path className="cls-1" d="M43.2,10.07c-1.15.76-1.12.75-.47,2.15.11.25-.46.53-.4,1A3.77,3.77,0,0,1,41,16.36a4,4,0,0,0-1,3.42c.12.63.68.9,1.14,1.13s.7-.38.94-.69a24.31,24.31,0,0,1,1.88-2.31c.62-.65,1.12-.5,1.56.13a7.74,7.74,0,0,1,1.12,1.81,12.59,12.59,0,0,0,1.66,3.42,2.74,2.74,0,0,1,.33,1.13c.3,1.43-.91,2.53-.79,3.91a.16.16,0,0,1,0,.1c-2.45.73-1.92,3.49-3.35,4.93a1.66,1.66,0,0,1-1.07.62c-3.42.41-6.87.67-10.27,1.33a21.78,21.78,0,0,1-3.71.13c-.54,0-.63-.21-.48-.76a15.41,15.41,0,0,0,.6-7,4,4,0,0,0-.79-2.09c-.86-1-.88-2.15-1.14-3.29a.79.79,0,0,1,.27-.85,15.73,15.73,0,0,0,1.4-1.31c.35-.37,1.29-.53.95-1.14s-.77-1.65-1.82-1.74-1-.43-.31-1a1.45,1.45,0,0,0,.41-1.2,12.32,12.32,0,0,1,.11-2c.1-.53.55-1,.95-.28.69,1.2,1.63.46,2.33.28s.42-1,.25-1.64a2.71,2.71,0,0,1,.08-2.09c.14-.25.27-.57.08-.79-.5-.62-.51-1.15.17-1.61a2.06,2.06,0,0,1,2.24-.2,17,17,0,0,0,4.44,1.83,4.89,4.89,0,0,1,2.77,1.22C42.26,10.12,42.56,10.45,43.2,10.07Z"/><path className="cls-1" d="M27.72,3.25c-.24.91.2,1.24,1.1,1.34.39,0,1.06,0,1.07.69s-.6.69-1.08.87a4.29,4.29,0,0,1-3.32.08c-1.2-.47-2.49.28-3.73.51-.1,0-.18.16-.28.22-.4.26,0,1.09-.75,1.07-1.11,0-2.26.27-3.31-.25-.76-.38-1.19-.19-1.49.55-.38.92-.8,1.82-1.18,2.73-.13.31-.34.73-.64.44-1.32-1.25-3.27-1-4.66-2C7.77,8.26,5.79,8.31,3.87,8.07c-.57-.07-1-.2-1.23-.76s-.75-.52-1.19-.69-.93-.46-.95-1,.6-.38.92-.56c1.14-.66,2.46-.61,3.68-.93A3.06,3.06,0,0,0,7.51,1.89C7.7,1.21,8.12.32,8.72.53s0,1.1,0,1.7a.75.75,0,0,1-.07.23c-.34.69-.78,1.57-.16,2.09S9.76,4.33,10.38,4a1.46,1.46,0,0,1,2.19.42c.08.14.16.27.25.4,1.29,1.75,1.26,1.5,3.45,1.27A10.9,10.9,0,0,0,21.32,4c.88-.59,2.25-.3,3.33-.71.59-.22,1.26-.18,1.75-.7.26-.28.65-.59,1.05-.42S27.63,2.85,27.72,3.25Z"/></svg>
                </aside>
            </div>
        )
    }
}

export default Michigan;;