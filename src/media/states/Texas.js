import React from 'react';
import ApiContext from '../../ApiContext';
import config from '../../config'

function ListOfCities(props) {
    return (
            <option value={props.city}>{props.city}</option>
    )
}

class Texas extends React.Component {
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
        <svg xmlns="http://www.w3.org/2000/svg"><path className="cls-1" d="M73.49,26.83c0,1.24,0,2.48,0,3.72a3.83,3.83,0,0,0,.82,2.55,11.26,11.26,0,0,1,2,10.31,32.69,32.69,0,0,1-.91,4.1A2,2,0,0,1,74,48.74c-.43.12-.82.34-1.23.42-2.45.48-3.78,2.4-5.27,4.07a10.72,10.72,0,0,1-6.79,3.55c-2,.28-4.15.55-5.43,2.51a.8.8,0,0,1-.86.28c-1.13-.16-1.2.48-1.37,1.4a38.49,38.49,0,0,0-.37,7.11,11.41,11.41,0,0,0,.81,3.7c.14.42.29.83.42,1.24.16.56.48,1.17-.1,1.66s-1-.13-1.5-.28q-2.11-.63-4.26-1.11c-1.73-.4-3.51-.88-4.54-2.35-.83-1.17-.76-2.88-1.93-4,.39-2.31-1.42-3.68-2.43-5.35-1.61-2.67-3.61-5.08-4.86-8-1-2.45-3.13-4.28-4.75-6.38a2,2,0,0,0-1.65-.56c-1.55-.08-3.09,0-4.65-.21-1.37-.19-1.84,1.21-2.48,2.13s-1,1.71-1.49,2.56a1.2,1.2,0,0,1-1.61.6,14.19,14.19,0,0,1-7.08-5.35c-1.19-1.71-1.17-3.84-2-5.66-.64-1.37-1.23-2.69-2.92-3-.55-.11-.79-.65-1.11-1.05A43.44,43.44,0,0,0,1,32.6c-.27-.26-.73-.55-.39-1s.62-1,1.36-1c3.42.14,6.85.18,10.27.43,2.12.16,4.22.15,6.34.18,1.11,0,1.88-.22,1.92-1.63a40.39,40.39,0,0,0,0-4.12,14.29,14.29,0,0,1,.36-3.11c.47-2.78.52-5.62.76-8.43.27-3.33.6-6.66.88-10a23.32,23.32,0,0,0,0-2.51c0-.66.23-.92.91-.92,4.58,0,9.17,0,13.74.32,1.62.12,1.87.49,1.69,2.14a47.65,47.65,0,0,0,0,10.27,1.73,1.73,0,0,0,1.6,1.8,10.39,10.39,0,0,1,4.56,1.87,3.07,3.07,0,0,0,3.65.57c.5-.28.85.09,1.18.35a7.51,7.51,0,0,0,4.71,1.42,18.25,18.25,0,0,1,6,.78,4.41,4.41,0,0,0,4.12-.47,1.23,1.23,0,0,1,1-.24c2.31.73,4.69,1.19,7,2.07.63.25.69.72.69,1.24,0,1.4,0,2.8,0,4.2Z"/></svg>
                </aside>
            </div>
        )
    }
}

export default Texas;;