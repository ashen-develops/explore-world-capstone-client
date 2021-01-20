import React from 'react';
import ApiContext from '../../ApiContext';
import config from '../../config'

function ListOfCities(props) {
    return (
            <option value={props.city}>{props.city}</option>
    )
}

class Wisconsin extends React.Component {
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
        <svg xmlns="http://www.w3.org/2000/svg"><path className="cls-1" d="M28.15,11.82a1.69,1.69,0,0,1,0,1.36,15.14,15.14,0,0,0-.94,4.47c-.13,1.72-.8,3.24-1,4.89a1.1,1.1,0,0,0,0,.36c.32,1.9-.36,3.85.32,5.74.34.95.08,1.4-1.13,1.63-3.76.72-7.64.38-11.38,1.28-1.47.35-3.77-1.55-3.67-3A8,8,0,0,0,9,23.69c-.64-1.06-.65-2.51-1.79-3.29a37.3,37.3,0,0,0-4.73-3A2.43,2.43,0,0,1,1,15.1a32.84,32.84,0,0,0-.45-4.63A2.74,2.74,0,0,1,1.76,8,4.32,4.32,0,0,0,3.11,4.25c0-1.82.24-2.07,2.06-2.1A5.29,5.29,0,0,0,8.48,1c.34-.27.73-.67,1.16-.4s.1.65,0,1,0,.72.5.84a7.12,7.12,0,0,1,4,2.24c.42.5,1,.41,1.55.52,2.46.55,4.4,2.22,6.74,3a4.06,4.06,0,0,1,2.78,2.49c.47,1.16.75,2.19-.27,3.17a1,1,0,0,0-.19.3c-.2.6-.9,1.28,0,1.78s1.12-.42,1.5-.92A32.66,32.66,0,0,1,28.15,11.82Z"/></svg>
                </aside>
            </div>
        )
    }
}

export default Wisconsin;;