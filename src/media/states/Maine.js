import React from 'react';
import ApiContext from '../../ApiContext';
import config from '../../config'

function ListOfCities(props) {
    return (
            <option value={props.city}>{props.city}</option>
    )
}

class Maine extends React.Component {
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
        <svg xmlns="http://www.w3.org/2000/svg"><path className="cls-1" d="M19.38,16.18a2,2,0,0,1-.8,1.31c-1.29,1-2.77,1.7-3.77,3.08-.48.65-1.37.31-2,.25-1.22-.09-1.54.44-1.52,1.54a4.35,4.35,0,0,1-3.51,4.26c-.6.12-.81.37-.82.94a14.32,14.32,0,0,1-.77,2.87,1.19,1.19,0,0,1-.78.86c-.47.16-.54-.35-.76-.61a12.94,12.94,0,0,1-2-4.63c-.78-2.47-.85-5.1-1.93-7.47a1.08,1.08,0,0,1,.18-1.32c.16-.17.37-.44.33-.6-.49-1.77.86-3.16,1-4.79s.32-3.41.29-5.13A9.65,9.65,0,0,1,3.71,2.1c.42-.79,1-1,1.63-.35a.92.92,0,0,0,1.45.06,4.82,4.82,0,0,1,1-.58c2.23-1.18,2.74-1,3.92,1.23A14.17,14.17,0,0,1,13.42,8c.14,1.9.55,2.32,2.51,2.84a1,1,0,0,1,.83.9,4.1,4.1,0,0,0,1.88,2.78C19.27,14.93,19.16,15.64,19.38,16.18Z"/></svg>
                </aside>
            </div>
        )
    }
}

export default Maine;;